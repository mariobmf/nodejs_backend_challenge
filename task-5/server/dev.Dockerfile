FROM node:18-bullseye-slim AS base
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
EXPOSE 3333

FROM base as dev
ENV NODE_ENV=development
RUN npm i
COPY . /
CMD ["npm", "run", "dev"]