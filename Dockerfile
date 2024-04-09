FROM node:18-alpine as base

USER root
COPY package*.json ./
RUN npm install && \
    npm install -g pm2
COPY . /webapps
WORKDIR /webapps