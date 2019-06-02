const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

// Connect to Mongo
let mongodb;

const dbUser = encodeURIComponent(process.env.MONGO_USERNAME);
const dbPwd = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbUrl = `mongodb://${dbUser}:${dbPwd}@mongo:27017/`;
const dbName = 'root';
const mongoClient = new MongoClient(dbUrl);

mongoClient.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  mongodb = mongoClient.db(dbName);
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
