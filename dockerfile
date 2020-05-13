FROM nginx:alpine
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

#npm run build
# docker run -p 8080:80 -v ${pwd}/dist:/usr/share/nginx/html angular
