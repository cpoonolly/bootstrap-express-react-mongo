# bootstrap-express-react-mongo
Bootstrap app for a dockerized Express + React + MongoDB setup

## Running
Simply run `docker-compose up -d` to run

This creates the following containers
- Mongo DB
- Express Server
- React dev server (built and run using `create-react-app`)
- React prod server (served with nginx internally)

The dev server is available on http://localhost:3000

The prod server is available on http://localhost:80

## Development
For the most part all you need to do is modify the code! Changes are picked up automatically!

Exceptions to this are:
- When adding new npm packages you should run `docker-compose down && docker-compose build && docker-compose up -d`
- When picking up changes on the prod server
