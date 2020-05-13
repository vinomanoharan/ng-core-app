FROM node AS node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY .  . 
RUN npm run build

FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


# prod.dockerfile
## docker build -t ng-app:v1 -f .\prod.dockerfile .
## docker run -p 8080:80 ng-app:v1