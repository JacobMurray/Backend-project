const User = require('../models/user');

exports.updateFlag = (req, res, next) => {
  const { latitude, longitude } = req.query;
  console.log(latitude)
  //if(!latitude || !longitude) {Promise.reject({ status: 400, message: 'You need a latitude and longitude' })}
  //const { latitude, longitude } = req.body;
  const { username } = req.params;
  User.findOneAndUpdate(
    { username },
    {
      flagLong: longitude,
      flagLat: latitude,
      flagGenerated: true,
      flagCaptured: false
    }
  )
    .lean()
    .then(user => {
      if (!user){ return Promise.reject({ status: 404, message: 'Username not found' })};
      return User.find({ username: user.username });
    })
    .then(user => {
      res.send({ user: user[0] });
    })
    .catch(err => {
      console.log(err)
      next(err)
    });
};

exports.isFlagGenerated = (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: 'Username not found' });
      res.send({
        generated: user[0].flagGenerated,
        captured: user[0].flagCaptured
      });
    })
    .catch(next);
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
    .then(user => {
      if (!user){return Promise.reject({ status: 404, message: 'Username not found' })};
      return User.find({ username: user.username });
    })
    .then(user => res.send({user : user[0]}))
    .catch(next);
};

exports.updateZoneLocation = (req, res, next) => {
  const { username } = req.params;
  const { latitude, longitude } = req.query
  User.findOneAndUpdate(
    {username},
    {
      zoneLat : latitude,
      zoneLong : longitude
    }
  )
  .lean()
  .then(user => {
    return User.find({ username: user.username });
  })
  .then(user => res.send({user: user[0]}))
  .catch(next)
}
