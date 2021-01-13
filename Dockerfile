FROM node:alpine AS build

WORKDIR /workspace

COPY package.json yarn.lock ./

RUN yarn

COPY . .

ENV NODE_ENV=production

RUN yarn build

FROM nginx:alpine as SERVE

COPY --from=build /workspace/build /usr/share/nginx/html
