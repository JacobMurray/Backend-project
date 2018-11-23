const User = require('../models/user');
const passport = require('passport');

const secret = '7x0jhxt"9(thpX6';

exports.addUser = (req, res, next) => {
  const { username, name, password, confirm, image } = req.body;
  if (!username || !name || !confirm)
    res.status(400).send({ message: 'Please fill out all fields' });
  if (password !== confirm)
    res.status(400).send({ message: 'Passwords must match' });
  else {
    User.register(new User({ username, name, image }), password)
      .then(user => {
        if (!user) return Promise.reject({ status: 404, message: 'Username not found' })
        passport.authenticate('local');
        res.status(201).send(user);
      })
      .catch(error => {
        next(error)
        res.send(error);
      });
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid Username or Password.' });
    }
    if (user) {
      res.status(200).send(user);
    }
  })(req, res, next);
};

exports.updateScore = (req, res, next) => {
  const { score } = req.query;
  const points = parseInt(score);
  const { username } = req.params;
  if (!points) return res.status(401).send({ message: 'Invalid score type' });
  User.findOneAndUpdate({ username }, { $inc: { score } }, { new: true }).lean().then(
    user => res.send(user)
  )
  .catch(next)
};

exports.getAllUsers = (req, res, next) => {
  User.find().then(users => {
    res.send({ users });
  })
  .catch(next)
};


exports.getUserByUsername = (req, res, next ) => {
  const {username} = req.params;
  User.find({username})
  .then(user => {
    if (user.length < 1) return Promise.reject({ status: 400, message: 'Username is not valid' })
    else res.send({ user: user[0] })
  })
  .catch(next)
} 