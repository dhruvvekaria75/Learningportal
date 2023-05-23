const googleRouter=require("express").Router();
const passport=require("passport");
const { generateToken }=require("../config/jwtTocken");
const User=require("../models/userModel");
const asynchandler=require("express-async-handler")
require("../utils/passport");

googleRouter.get("/login/success",asynchandler(async(req,res)=>{
    res.status(200).json({
        status:"true",
        message:"Login success"
     })
}));

googleRouter.get("/login/failed",asynchandler(async(req,res)=>{
     res.status(401).json({
        status:"false",
        message:"Login failed"
     })
}));

googleRouter.get("/google",
     passport.authenticate("google",["profile","email"])
);

googleRouter.get("/auth/google/callback",
   passport.authenticate("google",{
        successRedirect:"login/success",
        failureRedirect:"login/failed"
    })
);

googleRouter.get("/logout",asynchandler(async(req,res)=>{
       req.logout();
       res.redirect("/");
}));

module.exports=googleRouter;