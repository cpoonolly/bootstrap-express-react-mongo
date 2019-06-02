FROM node

WORKDIR /usr/src/app

# Cache dependencies
COPY ./package.json ./package.json
COPY ./package.json ./package.json
RUN npm install --silent

# Copy src code over
COPY . .

EXPOSE 8080

CMD [ "./entrypoint.sh" ]