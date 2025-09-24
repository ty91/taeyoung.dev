FROM node:22-alpine AS build-env
WORKDIR /app
# Enable pnpm via Corepack (respects packageManager in package.json)
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/generated ./generated
CMD ["pnpm", "start"]
