FROM node:16.0.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "serve"]

#docker run -p 3000:3000 -d sol-server-api
#docker run -p 3000:3000 --name dockerize-vue-sol-server-api -d sol-server-api
