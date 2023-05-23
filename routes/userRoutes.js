const express=require("express");
const { registerAUser, loginUser, getallUser, updateUser, deleteUser, getUser, unBlockedUser, blockedUser, updatePassword, forgotPasswordToken, resetPassword } = require("../controllers/userCtrl");
const userRouter=express.Router();
const {isAdmin,authMiddleware,restrictTo}=require("../middlewares/authMiddleware");
const {rateLimit}=require("express-rate-limit");

//all post routes
userRouter.post("/register",rateLimit(60*60*1000,2,"Secs",2),registerAUser);
userRouter.post("/login",loginUser);
userRouter.post("/forgot-password",forgotPasswordToken);

//all getusers
userRouter.get("/alluser",authMiddleware,restrictTo("Admin"),getallUser);
userRouter.get("/:id",authMiddleware,getUser)

//all put routes
userRouter.put("/update-profile",authMiddleware,updateUser);
userRouter.put("/block/:id",authMiddleware,restrictTo("Admin"),blockedUser);
userRouter.put("/unblock/:id",authMiddleware,restrictTo("Admin"),unBlockedUser);
userRouter.put("/update-password",authMiddleware,updatePassword);
userRouter.put("/reset-password/:token",resetPassword)

//all delete routes//
userRouter.delete("/:id",authMiddleware,restrictTo("Admin"),deleteUser)

module.exports=userRouter