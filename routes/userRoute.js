const userRouter = require("express").Router();
const {loginUser, addUser, updateScore, getAllUsers} =require("../controllers/userCont")

userRouter.post("/", addUser)
userRouter.get("/", getAllUsers)
userRouter.post('/login', loginUser)
userRouter.patch('/:username', updateScore)



module.exports = userRouter;