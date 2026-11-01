#!/usr/bin/env bash
# Run on the existing VPS after fetching this revision. FishKids is not rebuilt.
set -Eeuo pipefail
umask 022
revision="${1:?Full source commit SHA required}"
phase="${2:-stage}"
[[ "$revision" =~ ^[0-9a-f]{40}$ ]]
base=/home/desai/university
release="$base/releases/$revision"
config=/home/desai/deploy/nginx.conf
image="genesis-university:$revision"
compose() { docker-compose -p genesis -f "$base/docker-compose.yaml" "$@"; }
exec 9>/run/lock/fishkids-deploy.lock
flock -n 9

if [[ "$phase" == stage ]]; then
  [[ ! -e "$release" ]]
  mkdir -p "$release/source"
  git -C /home/desai/frontend archive "$revision" | tar -x -C "$release/source"
  printf '{"revision":"%s","site":"university"}\n' "$revision" > "$release/source/public/university-release.json"
  printf 'User-agent: *\nAllow: /\nSitemap: https://inco-edu.ru/sitemap.xml\n' > "$release/source/public/robots.txt"
  printf '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://inco-edu.ru/</loc></url></urlset>\n' > "$release/source/public/sitemap.xml"
  docker build --build-arg VITE_SITE=university --build-arg VITE_BACKEND_URL=https://fishkids.ru -t "$image" "$release/source" > "$release/build.log" 2>&1
  docker run --rm --entrypoint nginx "$image" -t
  docker run --rm --user nginx --entrypoint sh "$image" -c 'test -r /usr/share/nginx/html/index.html && test -r /usr/share/nginx/html/university-release.json'
  cat > "$release/compose.yaml" <<EOF
version: "3.8"
services:
  university:
    image: $image
    container_name: genesis-university
    restart: unless-stopped
    ports:
      - "127.0.0.1:5175:80"
networks:
  default:
    external: true
    name: deploy_default
EOF
  printf 'UNIVERSITY_STAGED revision=%s\n' "$revision"
elif [[ "$phase" == activate ]]; then
  [[ -f "$release/compose.yaml" && -f "$config" ]]
  if [[ -e "$base/docker-compose.yaml" ]]; then cmp "$release/compose.yaml" "$base/docker-compose.yaml"; fi
  docker inspect deploy_frontend_1 --format '{{.Id}} {{.Image}}' > "$release/fishkids-container.before"
  if [[ -e "$release/nginx.before.conf" ]]; then
    cmp "$config" "$release/nginx.before.conf"
  else
    cp -p "$config" "$release/nginx.before.conf"
  fi
  cp "$release/compose.yaml" "$base/docker-compose.yaml"
  changed=false
  rollback() {
    status=$?
    trap - ERR
    if [[ "$changed" == true ]]; then
      cat "$release/nginx.before.conf" > "$config"
      docker exec deploy_nginx_1 nginx -t && docker exec deploy_nginx_1 nginx -s reload
    fi
    echo "UNIVERSITY_FAILED; routing restored. Backup: $release"
    exit "$status"
  }
  trap rollback ERR
  compose up -d
  ready=false
  for attempt in $(seq 1 30); do
    if curl -fsS --max-time 3 http://127.0.0.1:5175/university-release.json | grep -Fq "$revision"; then ready=true; break; fi
    sleep 1
  done
  [[ "$ready" == true ]]
  python3 - "$config" "$release/nginx.candidate.conf" <<'PY'
import pathlib, sys
original = pathlib.Path(sys.argv[1]).read_text()
marker = '    server_name inco-edu.ru www.inco-edu.ru;'
assert original.count(marker) == 1
start = original.rfind('server {', 0, original.index(marker))
block = original[start:]
assert block.count('server {') == 1
assert block.count('proxy_pass http://frontend;') == 1
prefix = block[:block.index('    # API to Django')]
candidate = original[:start] + prefix + '''    # Genesis university has its own frontend and no school API.
    location ~ ^/(api|admin|media|static|_protected_courses)(/|$) { return 404; }
    location / {
        proxy_pass http://genesis-university:80;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
'''
assert original[:start] == candidate[:start]  # FishKids server blocks stay identical.
pathlib.Path(sys.argv[2]).write_text(candidate)
PY
  changed=true
  # Preserve the inode of the file bind-mounted into nginx.
  cat "$release/nginx.candidate.conf" > "$config"
  docker exec deploy_nginx_1 nginx -t
  docker exec deploy_nginx_1 nginx -s reload
  for host in inco-edu.ru www.inco-edu.ru; do
    ready=false
    for attempt in $(seq 1 15); do
      if curl -fsS --max-time 10 --resolve "$host:443:127.0.0.1" "https://$host/university-release.json" | grep -F "$revision"; then ready=true; break; fi
      sleep 1
    done
    [[ "$ready" == true ]]
  done
  curl -fsS --max-time 15 --resolve fishkids.ru:443:127.0.0.1 https://fishkids.ru/api/products/ >/dev/null
  docker inspect deploy_frontend_1 --format '{{.Id}} {{.Image}}' > "$release/fishkids-container.after"
  cmp "$release/fishkids-container.before" "$release/fishkids-container.after"
  trap - ERR
  printf 'UNIVERSITY_DEPLOY_OK revision=%s backup=%s\n' "$revision" "$release"
else
  echo 'Expected stage or activate'; exit 1
fi
