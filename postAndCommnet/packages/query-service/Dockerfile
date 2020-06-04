FROM node:alpine

WORKDIR /usr/app

COPY ./package.json .
RUN yarn --production
COPY ./dist ./dist

CMD ["node", "dist/query-service.js"] 
