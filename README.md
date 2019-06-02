# bootstrap-express-react-mongo
Bootstrap app for a dockerized Express + React + MongoDB setup

## Running
Simply run `docker-compose up -d` to run! Your website should now be available on http://localhost

This creates the following containers
- Mongo DB
- Express Server
- React
- Nginx reverse-proxy

The nginx container simply proxy passes any requests prefixed with `/api/` to express & everything else to react.

To build containers in "prod-like" mode simply run `docker-compose -f docker-compose.prod-like.yml up -d`.

In dev mode the react container internally uses `npm start` to server content.

In prod-like mode the react container internally uses `npm run build` + nginx to serve content.

## Development
For the most part all you need to do is modify the code! Changes are picked up automatically!

Exceptions to this are:
- When adding new npm packages
- When picking up changes in "prod-like" mode

For both these cases simply run `docker-compose down && docker-compose build && docker-compose up -d`
