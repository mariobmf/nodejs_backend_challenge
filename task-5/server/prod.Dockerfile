FROM node:18-bullseye-slim AS base
WORKDIR /app

FROM base AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
COPY . .
RUN npm ci install
RUN npm run build

FROM base AS dependences
ENV NODE_ENV production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
RUN npm ci --only=production && npm cache clean --force

FROM base AS production
ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
COPY --chown=node:node --from=dependences /app/package.json ./package.json
COPY --chown=node:node --from=dependences /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
EXPOSE 3333
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist/main.js"]

