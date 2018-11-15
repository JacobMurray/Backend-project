const User = require('../models/user');

exports.updateFlag = (req, res, next) => {
    const { latitude, longitude } = req.query;
    //const {latitude, longitude} = req.body;
    const { username } = req.params;
    User.findOneAndUpdate(
      { username },
      {
        flagLongitude : latitude,
        flagLatitude : longitude,
        flagGenerated: true,
        flagCaptured: false
      }
    )
      .then(user => User.find({ username: user.username }))
      .then(user => res.send({user: user[0]}))
      .catch(err => next(err));
  };
  
  exports.isFlagGenerated = (req, res, next) => {
    const { username } = req.params;
    User.find({ username })
    .then(user => {
        if (user.length < 1) return Promise.reject({ status: 404, message: 'Username not found' })
      res.send({
        generated: user[0].flagGenerated,
        captured: user[0].flagCaptured
      });
    })
    .catch(next)
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
  
