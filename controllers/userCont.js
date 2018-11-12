const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const secret = '7x0jhxt"9(thpX6';

exports.addUser = (req, res, next) => {
  const { username, name, password, confirm } = req.body;
  if (!username || !name || !confirm) res.status(400).send({ message: 'Please fill out all fields' })
  if (password !== confirm) res.status(400).send({ error: 'Passwords must match' });
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

exports.loginUser = (req, res, next) => {
  passport.authenticate('local' ,
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid Username or Password.' });
      }
      if (user) {
       res.send(user)
      }
    })(req, res, next);
};


exports.updateScore = (req,res,next) => {
  const {score} = req.query;
  const {username} = req.params
  console.log(score)
  User.findOneAndUpdate(
    {username},
    { $inc: { score } },
    { new: true }
    )
    .then(user => res.send(user))

}