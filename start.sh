#!/bin/bash
#chmod +x start.sh

if [ "$(docker ps -q -f name=dockerize-sol-server-api)" ]; then
    echo "Image already is executing"
else
    docker rm dockerize-sol-server-api
    docker run -p 3000:3000 --name dockerize-sol-server-api -d sol-server-api
fi