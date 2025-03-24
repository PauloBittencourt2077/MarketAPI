FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN npm install wait-on

CMD ["sh", "-c", "npx wait-on tcp:db:5432 && npm run start:dev"]