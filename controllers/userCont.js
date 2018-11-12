const User = require('../models/user');
const passport = require('passport');

exports.addUser = (req, res, next) => {
  const { username, name, password, confimPass } = req.body
  if(password !== confimPass) res.send('passwords must match')
  else{
  User.register(new User({ username, name }), password, )
    .then(user => {
      passport.authenticate('local');
      res.send(user)
    })
    .catch(error => {
      console.log(error)
      res.send(error)
    });
}
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
