FROM node:18.20.4

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]
