const userRouter = require("express").Router();
const {sendUser, addUser} =require("../controllers/userCont")

userRouter.post("/", addUser)
userRouter.post('/login', sendUser)



module.exports = userRouter;