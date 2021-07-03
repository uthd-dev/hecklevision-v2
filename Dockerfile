# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm run build

COPY . .

CMD [ "npm", "run", "start"]