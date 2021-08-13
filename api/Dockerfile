FROM node

WORKDIR /usr/app/src

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

