FROM node:18-bullseye-slim AS base
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
EXPOSE 3333

FROM base as production
ENV NODE_ENV=production
RUN npm i
COPY . /
RUN npm run build
CMD [ "node", "dist/main.js" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm i
COPY . /
CMD ["npm", "run", "dev"]