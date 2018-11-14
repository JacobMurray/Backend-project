const leaderRouter = require('express').Router();
const { getLeaderboard } =require('../controllers/leaderCont')

leaderRouter.get('/' , getLeaderboard)

module.exports = leaderRouter
