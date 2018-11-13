const seedDB = require('./seed');
const mongoose = require('mongoose');
const { DB_URL } = require('../config');
const userData = require('./devData/users');

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return seedDB(userData);
  })
  .then(() => mongoose.disconnect())
  .catch(console.log());
