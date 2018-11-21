const userRouter = require("express").Router();
const {loginUser, addUser, updateScore, getAllUsers, getUserByUsername} =require("../controllers/userCont")

userRouter.post("/", addUser)
userRouter.get("/", getAllUsers)
userRouter.post('/login', loginUser)
userRouter.patch('/:username', updateScore)
userRouter.get('/:username', getUserByUsername)



module.exports = userRouter;