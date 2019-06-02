#!/bin/sh

# Wait for Express & React then start the server
./wait-for-it.sh api:3000 -t 0 &&
./wait-for-it.sh client:3000 -t 0 &&
nginx -g 'daemon off;'