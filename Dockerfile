FROM node:16.15-alpine

WORKDIR /be

COPY package*json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
