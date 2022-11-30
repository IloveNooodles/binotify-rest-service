FROM node:lts-alpine3.16

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN yarn install

COPY . .

EXPOSE 7000

CMD [ "yarn", "start:prod" ]