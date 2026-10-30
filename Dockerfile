FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG VITE_BACKEND_URL=https://fishkids.ru
ARG VITE_YMAPS_API_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_YMAPS_API_KEY=$VITE_YMAPS_API_KEY
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim AS runtime
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
