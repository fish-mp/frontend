#!/usr/bin/env bash
# Run on the existing FishKids VPS. Deploys only the frontend service.
set -Eeuo pipefail
umask 077

revision="${1:?Usage: bash deploy-aquarium.sh FULL_COMMIT_SHA}"
[[ "$revision" =~ ^[0-9a-f]{40}$ ]] || { echo 'Expected a full commit SHA'; exit 1; }
frontend=/home/desai/frontend
deploy=/home/desai/deploy
compose_file="$deploy/docker-compose.yaml"
container=deploy_frontend_1

if docker compose version >/dev/null 2>&1; then
  compose=(docker compose -p deploy -f "$compose_file")
elif docker-compose version >/dev/null 2>&1; then
  compose=(docker-compose -p deploy -f "$compose_file")
else
  echo 'Docker Compose is unavailable'; exit 1
fi

[[ -f "$frontend/Dockerfile" && -f "$frontend/.env" && -f "$compose_file" ]]
[[ -z "$(git -C "$frontend" status --porcelain --untracked-files=no)" ]] || {
  echo 'Tracked frontend files have local changes. Stopped before deployment.'; exit 1;
}
[[ "$(docker inspect --format '{{len .Mounts}}' "$container")" == 0 ]] || {
  echo 'Frontend mount configuration changed. Stopped before deployment.'; exit 1;
}
old_image=$(docker inspect --format '{{.Image}}' "$container")
image_name=$(docker inspect --format '{{.Config.Image}}' "$container")
[[ "$image_name" == deploy_frontend || "$image_name" == deploy_frontend:latest ]] || {
  echo 'Unexpected frontend image name. Stopped before deployment.'; exit 1;
}
stamp=$(date -u +%Y%m%dT%H%M%SZ)
release_dir="$deploy/releases/aquarium-$stamp"
mkdir -p "$release_dir"
rollback_tag="deploy_frontend:before-aquarium-$stamp"
docker image tag "$old_image" "$rollback_tag"
git -C "$frontend" rev-parse HEAD > "$release_dir/previous-source.txt"
printf '%s\n' "$rollback_tag" > "$release_dir/rollback-image.txt"
docker cp "$container:/usr/share/nginx/html" "$release_dir/previous-html"

release_started=false
on_error() {
  status=$?
  trap - ERR
  set +e
  docker image tag "$old_image" "$image_name"
  if [[ "$release_started" == true ]]; then
    echo 'Deployment failed; restoring previous frontend image.'
    "${compose[@]}" up -d --no-deps --no-build frontend
    docker exec deploy_nginx_1 nginx -t && docker exec deploy_nginx_1 nginx -s reload
  fi
  echo "Release failed. Backup: $release_dir"
  exit "$status"
}
trap on_error ERR

git -C "$frontend" fetch origin main
git -C "$frontend" cat-file -e "$revision^{commit}"
git -C "$frontend" merge --ff-only "$revision"
[[ "$(git -C "$frontend" rev-parse HEAD)" == "$revision" ]]
printf '{"revision":"%s","fishSpecies":29}\n' "$revision" > "$frontend/public/aquarium-release.json"

# The existing Dockerfile and .env supply the production build configuration.
# The local demo database, credentials and .env.local are not in the repository.
"${compose[@]}" build frontend

# Keep older hashed chunks so already-open browser sessions can still navigate.
if [[ -d "$release_dir/previous-html/assets" ]]; then
  printf 'FROM %s\nCOPY previous-html/assets/ /usr/share/nginx/html/assets/\n' "$image_name" > "$release_dir/Dockerfile"
  docker build -t "$image_name" "$release_dir"
fi

release_started=true
"${compose[@]}" up -d --no-deps --no-build frontend
healthy=false
for attempt in $(seq 1 30); do
  if curl --fail --silent --show-error --max-time 3 http://127.0.0.1:5173/aquarium-release.json 2>/dev/null | grep -Fq "$revision"; then
    healthy=true
    break
  fi
  sleep 1
done
[[ "$healthy" == true ]]
docker exec deploy_frontend_1 nginx -t
docker exec deploy_nginx_1 nginx -t
docker exec deploy_nginx_1 nginx -s reload

for host in fishkids.ru inco-edu.ru; do
  curl --fail --silent --show-error --max-time 15 --resolve "$host:443:127.0.0.1" "https://$host/aquarium-release.json" | grep -F "$revision"
  curl --fail --silent --show-error --max-time 15 --resolve "$host:443:127.0.0.1" "https://$host/api/products/" >/dev/null
done
trap - ERR
echo "AQUARIUM_DEPLOY_OK revision=$revision species=29"
echo "Previous frontend image: $rollback_tag"
echo "Backup: $release_dir"
