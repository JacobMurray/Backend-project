process.env.NODE_ENV = 'production'
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport')

const seedDB = userData => {
  return mongoose.connection
  .dropDatabase()
  .then(() => {
   const newUser =  userData.map(user => {
      const { username, name, password } = user
      return User.register(new User({ username, name }), password)
    })
     return Promise.all(newUser)   
  })
  .then(user => {
    passport.authenticate('local');
    return user
  })
  .catch(error => {
    console.log(error);
    res.send(error);
  });
};

module.exports = seedDB;
