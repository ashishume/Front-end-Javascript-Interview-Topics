FROM node:alpine3.17 as nodework
WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

#nginx block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /myapp/build .
ENTRYPOINT [ "nginx","-g","daemon off;" ]


#DOCKER COMMANDS to build and run
#Build --> docker build -f Dockerfile_ref -t <your-image-name> .
#Example--> docker build -t reactapp .

#RUN THE IMAGE as container --> docker run -p <host-port>:<container-port> <your-image-name>
#example1--->  docker run -p 3000:3000 reactapp
#example2--->  docker run -d -p 3000:3000 reactapp
#here -d is for running the server background



# FOR reference follow this video: https://www.youtube.com/watch?v=WOeSkyM9mRY