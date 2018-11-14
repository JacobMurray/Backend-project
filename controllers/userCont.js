const User = require('../models/user');
const passport = require('passport');

const secret = '7x0jhxt"9(thpX6';

exports.addUser = (req, res, next) => {
  const { username, name, password, confirm } = req.body;
  if (!username || !name || !confirm)
    res.status(400).send({ message: 'Please fill out all fields' });
  if (password !== confirm)
    res.status(400).send({ error: 'Passwords must match' });
  else {
    User.register(new User({ username, name }), password)
      .then(user => {
        passport.authenticate('local');
        res.status(201).send(user);
      })
      .catch(error => {
        console.log(error);
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
  User.findOneAndUpdate({ username }, { $inc: { score } }, { new: true }).then(
    user => res.send(user)
  );
};

exports.updateFlag = (req, res, next) => {
  const { latitude, longitude } = req.query;
  const { username } = req.params;
  User.findOneAndUpdate(
    { username },
    {
      longitude,
      latitude,
      flagGenerated: true
    }
  )
    .then(user => User.find({ username: user.username }))
    .then(user => res.send(user))
    .catch(err => next(err));
};

exports.isFlagGenerated = (req, res, next) => {
  const { username } = req.params;
  User.find({ username }).then(user => {
    res.send({
      generated: user[0].flagGenerated,
      captured: user[0].flagCaptured
    });
  });
};

exports.getAllUsers = (req, res, next) => {
  User.find().then(users => {
    res.send({ users });
  });
};

exports.flagCaptured = (req, res, next) => {
  const { username } = req.params;
  User.findOneAndUpdate(
    { username },
    {
      flagCaptured: true,
      flagGenerated: false
    }
  )
    .then(user => User.find({ username: user.username }))
    .then(user => res.send(user))
    .catch(err => next(err));
};
