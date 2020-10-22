FROM node:alpine

RUN mkdir /usr/ope-groups
WORKDIR /usr/ope-groups

COPY package.json package-lock.json ./
RUN npm i

COPY . ./

EXPOSE 3001

CMD node src/index.js
