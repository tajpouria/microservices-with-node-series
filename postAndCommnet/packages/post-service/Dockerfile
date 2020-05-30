FROM node:alpine

WORKDIR /usr/app

ENV SERVICE_NAME=post-service
ENV PORT=4000
ENV DB_URL=mongodb://127.0.0.1:27017/posts
ENV EVENT_BROKER={"hostname": "localhost", "port": 4005, "path": "/" }

COPY ./pacakge.json .
RUN npm i
COPY . .

EXPOSE 4000

CMD "npm run serve" 

