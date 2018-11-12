const User = require('../models/user');

exports.addUser = (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password)
    .then(user => {
      passport.authenticate('local');
      return user;
    })
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error)
    });
};

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  User.find({ username: username })
    .then(user => {
      if (user.length === 0)
        return Promise.reject({
          status: 404,
          message: 'That user doesnt exist'
        });
      res.send({ user: user[0] });
    })
    .catch(err => {
      next(err);
    });
};
