# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

COPY . .

CMD [ "node", "app.js"]