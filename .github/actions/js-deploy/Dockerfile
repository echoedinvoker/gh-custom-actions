FROM node:20-alpine

COPY package.json ./package.json

RUN npm install

COPY . .

CMD ["node", "main.js"]
