const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const assert = require('assert');
const _ = require('lodash');

const bcrypt = require('bcrypt');
const Chance = require('chance');

const MongoClient = require('mongodb').MongoClient;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Setup DB
let db;

const dbUser = encodeURIComponent(process.env.MONGO_USERNAME);
const dbPwd = encodeURIComponent(process.env.MONGO_PASSWORD);
const dbUrl = `mongodb://${dbUser}:${dbPwd}@mongo:27017/`;
const dbName = 'root';
const mongoClient = new MongoClient(dbUrl, { useNewUrlParser: true });

const bcryptSalt = bcrypt.genSaltSync();
const chance = new Chance(1000); // sticking with a seed for repeatable names

mongoClient.connect((err) => {
  assert.equal(null, err);

  // drop the database (in case it already exists) & recreate
  mongoClient.db(dbName).dropDatabase();
  db = mongoClient.db(dbName);

  // Populate users
  let doctors =_.range(0, 3).map((i) => ({
    username: `doctor${i}`,
    password: bcrypt.hashSync(`password${i}`, bcryptSalt),
    is_doctor: true,
    is_patient: false,
  }))

  let patients =_.range(0, 10).map((i) => ({
    username: `patient${i}`,
    password: bcrypt.hashSync(`password${i}`, bcryptSalt),
    is_doctor: false,
    is_patient: true,
    patient_details: {
      name: chance.name(),
      age: chance.age(),
      email: chance.email(),
      address: chance.address(),
      phone: chance.phone()
    }
  }))

  db.collection('user').insertMany(_.concat(doctors, patients));
  db.collection('user').createIndex({username: 1});
});

// Setup Passport
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    let user = await db.collection('user').findOne({username: username});

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    } else if (!bcrypt.compare(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    } else {
      return done(null, user, { message: 'Success!'});
    }
  } catch (err) {
    done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    let user = await db.collection('user').findOne({username: username});

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Setup Express + Middleware
const app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'prod' : 'dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: 'process.env.SESSION_SECRET'}));
app.use(passport.initialize());
app.use(passport.session());

// Setup Routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.end()
});

app.post('/logout', (req, res) => {
  req.logout()
  res.send(null);
});

app.put('/patient', async (req, res, next) => {
  try {
    // check if session user is a doctor
    let sessionUser = req.user;
    if (!sessionUser) {
      res.status(401);
      res.json({msg: 'Unauthorized'});
      return;
    } else if (!sessionUser.is_patient) {
      res.status(403);
      res.json({msg: 'Permission Denied'});
      return;
    }

    // update patient info
    await db.collection('user').updateOne(
      { _id: sessionUser._id },
      { $set: { patient_details: req.body } }
    );

    // reload patient info
    let patient = await db.collection('user').findOne({_id: sessionUser._id});

    res.json({patient_details: patient.patient_details});
  } catch (err) {
    next(err);
  }
});

app.get('/patients', async (req, res, next) => {
  try {
    // check if user is a doctor
    let sessionUser = req.user;
    if (!sessionUser) {
      res.status(401);
      res.json({msg: 'Unauthorized'});
      return;
    } else if (!sessionUser.is_doctor) {
      res.status(403);
      res.json({msg: 'Permission Denied'});
      return;
    }

    // find all patients
    let patients = await db.collection('user').find({is_doctor: false}).toArray();
    let patientsJson = patients.map((user) => user.patient_details);

    res.json({patients: patientsJson});
  } catch (err) {
    next(err);
  }
});

app.get('/', async (req, res, next) => {
  try {
    let userStats = await db.collection('user').stats();
    let username = req.user ? req.user.username : '';
  
    res.json({msg: `Hello ${username} !There are ${userStats.count} users!`});
  } catch (err) {
    next(err);
  }
});

module.exports = app;
