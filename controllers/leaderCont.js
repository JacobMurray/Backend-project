const LeaderBoard = require('../models/leaderboard');
const User = require('../models/leaderboard');


exports.getLeaderboard = (req, res, next) => {
    User.find()
    .then(users => LeaderBoard.create)
}