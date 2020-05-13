# ng-core-app

# dockerfile
### docker build -t ng-app:v1 .
### docker run -p 8080:80 -v ${pwd}/dist/:/usr/share/nginx/html ng-app:v1

# prod.dockerfile
### docker build -t ng-app:v1 -f .\prod.dockerfile .
### docker run -p 8080:80 ng-app:v1
