const Newsletter=require("../models/newsLetterModel");
const asynchandler=require("express-async-handler");
const validateMongodbId=require("../config/validateMongodbId");

//subscribe successfully
const subscribe=asynchandler(async(req,res)=>{
    try{
       const newEmail=await Newsletter.create(req.body);
       res.status(200).json({
         status:true,
         message:"Subscribed successfully"
       })
    }catch(err){
       throw new Error(err);
    }
})

//unsubscribe successfully
const unsubscribe=asynchandler(async(req,res)=>{
    try{
       const {id}=req.params;
       const deleteEmail=await Newsletter.findByIdAndDelete(id);
       res.status(200).json({
         status:true,
         message:"UnSubscribed successfully"
       })
    }catch(err){
       throw new Error(err);
    }
})

module.exports={subscribe,unsubscribe};
