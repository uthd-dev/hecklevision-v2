# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production
ENV PORT=3000
ENV BACKEND_HOST=https://ws1.hv.do1.uthd.dev

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm run build

COPY . .

CMD [ "npm", "run", "start"]