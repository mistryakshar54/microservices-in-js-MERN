FROM node:alpine

WORKDIR /app

ENV CI=true

COPY package.json .

RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]
