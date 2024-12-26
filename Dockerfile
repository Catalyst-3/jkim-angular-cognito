FROM node:18.20.4

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV HOST=0.0.0.0
ENV PORT=5173
ENV CONFIGURATION=development
CMD ["npm", "start"]
