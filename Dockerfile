FROM node:18.20.4

WORKDIR /app

COPY package.json package-lock.json ./
COPY .env ./
COPY scripts/ ./scripts/
COPY src/ ./src/

RUN npm install

COPY . .

RUN chmod +x scripts/set-env.cjs
RUN node scripts/set-env.cjs

EXPOSE 5173

ENV HOST=0.0.0.0
ENV PORT=5173
ENV CONFIGURATION=development

CMD ["npm", "build", "npm", "start"]
