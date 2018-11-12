const userRouter = require("express").Router();
const {loginUser, addUser, updateScore} =require("../controllers/userCont")

userRouter.post("/", addUser)
userRouter.post('/login', loginUser)
userRouter.patch('/:username', updateScore)



module.exports = userRouter;