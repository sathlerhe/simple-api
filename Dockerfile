FROM node:24-alpine AS base

FROM base AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

FROM base AS prod
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm i --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 80
CMD ["node", "dist/server.js"]
