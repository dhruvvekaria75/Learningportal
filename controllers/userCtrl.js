const { generateToken } = require("../config/jwtTocken");
const validateMongodbId = require("../config/validateMongodbId");
const User=require("../models/userModel");
const asynchandler=require("express-async-handler");
const crypto=require('crypto');
const sendEmail=require("./emailCtrl");

//create a user
const registerAUser=asynchandler(async(req,res)=>{
    //get email from req.body and find whether a user with this email exists pr not
     const email=req.body.email;
    //Find the user with this email and get from req.body
     const findUser=await User.findOne({email:email})

     if(!findUser){
        //create a new user
        const createUser=await User.create(req.body);
        res.status(200).json({
           status:true,
           message:"User create successfully",
           createUser
        })
     }else{
        throw new Error("User Already exists")
     }
})

//login user
const loginUser=asynchandler(async(req,res)=>{
   const {email,password}=req.body;
   //check if user exist or not
   const findUser=await User.findOne({email:email});
     if(findUser&& (await findUser.isPasswordMatched(password))){
        res.status(200).json({
           status:true,
           message:"User Login successfully",
           token:generateToken(findUser?._id),
           role:findUser?.roles,
           username:findUser?.firstname+findUser?.lastname,
           user_image:findUser?.user_image,
        })
     }else{
        throw new Error("Invalid credentials")
     }
   })

//get a user
const getUser=asynchandler(async(req,res)=>{
   const {id}=req.params;
   validateMongodbId(id);
   try{
      const getProfile=await User.findById(id);
      res.status(200).json({
         status:true,
         message:"User Found",
         getProfile
      })
   }catch(err){
      throw new Error(err);
   }
})

//get all users
const getallUser=asynchandler(async(req,res)=>{
   try{
     const allUser=await User.find();
     res.status(200).json({
        status:true,
        message:"All User fetched successfully",
        allUser
     })
   }catch(error){
      throw new Error(error);
   }
})

//update a user profile
const updateUser=asynchandler(async (req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
       const user=await User.findByIdAndUpdate(_id,req.body,{new:true});
       res.status(200).json({
         status:true,
         message:"Profile updated successfully",
         user
       })
    }catch(error){
       throw new Error(error)
    }
})

//delete a user//
const deleteUser=asynchandler(async(req,res)=>{
   const {id}=req.params;
   validateMongodbId(id);
   try{
     await User.findByIdAndDelete(id);
      res.status(200).json({
         status:true,
         message:"User Deleted Successfully"
      })
   }catch(error){
      throw new Error(error);
   }
})

//block a user
const blockedUser=asynchandler(async(req,res)=>{
   const {id}=req.params;
   validateMongodbId(id);
   try{
     const block=await User.findByIdAndUpdate(id,{isblocked:true},{new:true});
      res.status(200).json({
         status:true,
         message:"User Blocked Successfully"
      })
   }catch(error){
      throw new Error(error);
   }
})

//unblock user
const unBlockedUser=asynchandler(async(req,res)=>{
   const {id}=req.params;
   validateMongodbId(id);
   try{
      const unblock=await User.findByIdAndUpdate(id,{isblocked:true},{new:true});
      res.status(200).json({
         status:true,
         message:"User Unblocked Successfully"
      })
   }catch(error){
      throw new Error(error);
   }
})

//update password
const updatePassword=asynchandler(async(req,res)=>{
   const {_id}=req.user;
   const {password}=req.body;
   validateMongodbId(_id);
   try{
     const user=await User.findById(_id);
     if(user&& (await user.isPasswordMatched(password))){
        throw new Error("Please provide a new password insted of old one")
     }else{
       if(password){
          user.password=password;
          await user.save();
          res.status(200).json({
            status:true,
            message:"Password updated successfully"
         })
       }
     }
   }catch(err){
      throw new Error(err);
   }
})

//forgot password token 
const forgotPasswordToken=asynchandler(async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        throw new Error("User Not Exists");
    }else{
       try{
          const token=await user.createPasswordResetToken()
          await user.save();
          const resetlink=`http://localhost:6000//api/user/reset-password/${token}`;
          const data={
              to:email,
              text:`Hey ${user.firstname + " " + user.lastname}`,
              subject:"Forgot password",
              html:resetlink
          }
          sendEmail(data);
          res.status(200).json(resetlink)
       }catch(err){
          throw new Error(err)
       }
    }
})

//resetpassword token
const resetPassword=asynchandler(async(req,res)=>{
   const {password}=req.body;
   const {token}=req.params;
   const hashToken=crypto.createHash("sha256").update(token).digest("hex");
   const user =await User.findOne({
      passwordResetToken:hashToken,
      passwordResetExpires:{ $gt:Date.now() }
   })
    if(!user){
      throw new Error("Token expired ,please try again");
    }
    user.password=password;
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save();
    res.status(200).json({
      status:true,
      message:"Password reset successfully"
    })
})


module.exports={
  registerAUser,
  loginUser,
  getallUser,
  updateUser,
  deleteUser,
  getUser,
  blockedUser,
  unBlockedUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword
};
