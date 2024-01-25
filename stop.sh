#!/bin/bash
#chmod +x stop.sh

if [ "$(docker ps -q -f name=dockerize-sol-server-api)" ]; then
    docker stop dockerize-sol-server-api
    echo "Container stopped."
else
    echo "Container is not executing"
fi