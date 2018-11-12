const userRouter = require("express").Router();
const {sendUser, addUser} =require("../controllers/userCont")

userRouter.post("/", addUser)
userRouter.get('/:username', sendUser)
userRouter.get('/', (req, res) =>res.send('please add a username to url'))



module.exports = userRouter;