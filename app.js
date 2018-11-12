const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localStrategy = require('passport-local');
const User = require('./models/user');
const DB_URL = process.env.DB_URL || require('./config').DB_URL;
const cors = require('cors');
const userRouter  = require('./routes/userRoute');

mongoose.connect(
  DB_URL,
  () => {
    console.log(`connected to ${DB_URL}`);
  }
);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api', (req, res) =>
  res.sendFile(__dirname + '/public/homepage.html')
);
app.use("/api/user", userRouter);

module.exports = app;
