FROM node:lts-alpine3.16

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "start:dev" ]

EXPOSE 3333