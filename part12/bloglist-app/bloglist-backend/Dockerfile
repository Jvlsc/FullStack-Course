# Stage 1: Test Stage
FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run test:all


# Stage 2: Production Stage
FROM node:20 AS production-stage

WORKDIR /usr/src/app

COPY --from=test-stage /usr/src/app/ .

RUN npm ci

CMD ["npm", "start"]