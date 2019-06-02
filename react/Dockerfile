FROM node:10

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json ./package.json 
COPY ./yarn.lock ./yarn.lock 
RUN npm install --silent
COPY . .

CMD [ "npm", "start" ]