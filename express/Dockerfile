FROM node:10

WORKDIR /usr/src/app

# Cache dependencies & then copy remaining src files
COPY ./package.json ./package.json
RUN npm install --silent
COPY . .

EXPOSE 8080

CMD [ "./entrypoint.sh" ]