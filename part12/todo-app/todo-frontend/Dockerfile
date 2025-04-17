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

ENV VITE_BACKEND_URL="/api"

RUN npm run build


# Stage 3: Production Stage
FROM node:20 AS production-stage

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "dist", "-l", "3000"]