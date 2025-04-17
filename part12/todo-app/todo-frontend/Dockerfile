# Stage 1: Test Stage
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test -- --watch false


# Stage 2: Build Stage
FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app/ .

RUN npm ci

ENV VITE_BACKEND_URL="http://host.docker.internal:3000"

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]