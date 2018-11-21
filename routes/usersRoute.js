const usersRouter = require("express").Router();
const {getAllUsers} = require('../controllers/userCont')

usersRouter.get('/', getAllUsers)


module.exports = usersRouter