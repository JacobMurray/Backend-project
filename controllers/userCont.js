const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const secret = '7x0jhxt"9(thpX6';

exports.addUser = (req, res, next) => {
  const { username, name, password, confimPass } = req.body;
  if (password !== confimPass) res.send('passwords must match');
  else {
    User.register(new User({ username, name }), password)
      .then(user => {
        passport.authenticate('local');
        res.send(user);
      })
      .catch(error => {
        console.log(error);
        res.send(error);
      });
  }
};

exports.sendUser = (req, res, next) => {
  passport.authenticate('local' ,
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid Username or Password.' });
      }
      if (user) {
        console.log(info)
       res.send(user)
      }
    })(req, res, next);
};
