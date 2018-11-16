const User = require('../models/user');

exports.updateFlag = (req, res, next) => {
  const { latitude, longitude } = req.query;
  //const { latitude, longitude } = req.body;
  const { username } = req.params;
  console.log(username)
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
      console.log(user)
      if (user.length < 0){ return Promise.reject({ status: 404, message: 'Username not found' })};
      return User.find({ username: user.username });
    })
    .then(user => {
      //const lat= +(user[0].flagLatitude)
      //const lon= +(user[0].flagLongitude)
      //const newuser = {...user[0]._doc, flagLatitude: lat, flagLongitude: lon}
      res.send({ user: user[0] });
    })
    .catch(next);
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
}
