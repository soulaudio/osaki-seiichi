FROM node:20-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]