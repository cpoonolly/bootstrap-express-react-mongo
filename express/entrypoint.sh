#!/bin/sh

# Wait for Mongo DB then start the server
./wait-for-it.sh mongo:27017 -- npm start