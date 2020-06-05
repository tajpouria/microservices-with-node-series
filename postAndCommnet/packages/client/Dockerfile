FROM node:alpine as build-stage
WORKDIR /usr/app

COPY package.json .
RUN yarn
COPY . .
RUN yarn run build

# production stage
FROM nginx:alpine as production-stage
COPY --from=build-stage /usr/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]