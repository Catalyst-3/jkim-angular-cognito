FROM node:18.20.4-alpine

WORKDIR /app

COPY ./package.json /app/package.json

RUN yarn global add @angular/cli
RUN yarn install

COPY . /app

EXPOSE 4200

CMD ["ng", "serve", "--poll", "2000", "--host", "0.0.0.0"]
