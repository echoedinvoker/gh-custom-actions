FROM sleavely/node-awscli:20

WORKDIR /app

COPY package.json .
RUN npm install

COPY main.js .

CMD ["node", "/app/main.js"]

