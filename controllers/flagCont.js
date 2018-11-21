const User = require('../models/user');

exports.updateFlag = (req, res, next) => {
  const { latitude, longitude } = req.query;
  //const { latitude, longitude } = req.body;
  if (!latitude || !longitude)
    throw { status: 400, message: 'latitude and longitude is needed' };
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
      if (!user) {
        return Promise.reject({ status: 404, message: 'Username not found' });
      }
      return User.find({ username: user.username });
    })
    .then(user => {
      res.send({ user: user[0] });
    })
    .catch(next);
};

exports.isFlagGenerated = (req, res, next) => {
  const { username } = req.params;
  User.find({ username })
    .then(user => {
      if (user.length <= 0)
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
      if (!user) {
        return Promise.reject({ status: 404, message: 'Username not found' });
      }
      return User.find({ username: user.username });
    })
    .then(user => res.send({ user: user[0] }))
    .catch(next);
};

exports.updateZoneLocation = (req, res, next) => {
  const { username } = req.params;
  const { latitude, longitude } = req.query;
  User.findOneAndUpdate(
    { username },
    {
      zoneLat: latitude,
      zoneLong: longitude
    }
  )
    .lean()
    .then(user => {
      return User.find({ username: user.username });
    })
    .then(user => res.send({ user: user[0] }))
    .catch(next);
};

exports.patchFlagCount = (req, res, next) => {
  const { username } = req.params;
  User.findOneAndUpdate(
    { username },
    { $inc: { dropFlagCount: 1 } },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return Promise.reject({ status: 404, message: 'Username not found' });
      }
      res.send({user})
    })
    .catch(next);
};
