const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const asynchandler=require("express-async-handler");

//verify token
const authMiddleware=asynchandler(async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token=req?.headers?.authorization?.split(" ")[1];
        //console.log(token)
        try{
            if(token){
                const decoded=jwt.verify(token,process.env.JWT_SECRET);
                const user =await User.findById(decoded?.id);
                req.user=user;
                next()
            }
        }catch(err){
              throw new Error("Not authorized ,please login again")
        }
    }else{
        throw new Error("Ther4e is no token atteched to the header ...")
    }
})

// //checking for admin. it is right user or not
// const isAdmin=asynchandler(async(req,res,next)=>{
//     //console.log(req.user);
//     const {email} =req.user;
//     const isAdmin=await User.findOne({email:email})
//     if(isAdmin.roles !=="Admin"){
//         throw new Error("You are not Admin")
//     }else{
//          next()
//     }
// })

// //checking for instructor. it is right user or not
// const isInstructor=asynchandler(async(req,res,next)=>{
//     const {email} =req.user;
//     const isInstructor=await User.findOne({email:email})
//     if(isInstructor.roles !=="Instructor"){
//         throw new Error("You are not Instructor")
//     }else{
//          next()
//     }
// })

// //checking for instrctor and admin.IT is right user or not
// const isBoth=asynchandler(async (req,res,next)=>{
//     const {email}=req.user;
//     const isBoth=await User.findOne({email:email});
//     if(isBoth.roles!=="Admin" && isBoth.roles!=="Instructor"){
//         throw new Error("You should have either admin role or instructor role")
//     }else{
//         next();
//     }
// });

//optimize code
const restrictTo=(...roles)=>{
    return asynchandler(async(req,res,next)=>{
        if(!roles.includes(req.user.roles)){
            throw new Error("You are not authorized");
        }else{
            next();
        }
    })
}

module.exports={authMiddleware,restrictTo};