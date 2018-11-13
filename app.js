const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localStrategy = require('passport-local');
const User = require('./models/user');
const DB_URL = process.env.DB_URL || require('./config').DB_URL;
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { handle404, handle400, handle500 } = require("./error-handling");


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
// JWT configuration
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
options.secretOrKey = '7x0jhxt&quot;9(thpX6'
// Configure Passport to use JWT strategy to look up Users.

passport.use('jwt',
  new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne(
      {_id: jwt_payload.id},
      function(err, user) {
        if (err) {return done(err, false);}
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      }
    );
  })
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/api', (req, res) =>
  res.sendFile(__dirname + '/public/homepage.html')
);
app.use('/api/user', userRouter);

//Error handling
app.use("/*", (req, res, next) => next({ status: 404, message: `${req.originalUrl} does not exist` }));
app.use(handle404);
app.use(handle400);
app.use(handle500);

module.exports = app;
