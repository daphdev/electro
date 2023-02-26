# Stage 1: Build the app
FROM node:18.12.1-slim as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# Stage 2: Serve the app with a smaller image
FROM nginx:1.17-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
EXPOSE 80
COPY --from=build /app/build .
