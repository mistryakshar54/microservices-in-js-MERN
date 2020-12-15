FROM node:alpine

WORKDIR /app

ENV CI=true

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
