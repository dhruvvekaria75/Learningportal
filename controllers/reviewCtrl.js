const validateMongodbId = require("../config/validateMongodbId");
const Review=require("../models/reviewModel");
const User=require("../models/userModel");
const asynchandler=require("express-async-handler");

//create a Review
const createReview=asynchandler(async(req,res)=>{
    //console.log(req.user);
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
       let data={ user:_id, comment:req.body.comment , color:req.body.color};
       const review=await Review.create(data);
       res.status(200).json({
          status:true,
          message:"review added successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all review Review
const getAllReview=asynchandler(async(req,res)=>{
    try{
       const review=await Review.find().populate("user");
       res.status(200).json({
          status:true,
          message:"all review fetched successfully",
          review
       })
    }catch(err){
        throw new Error(err);
    }
})

//get a single review Review
const getAReview=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const review=await Review.findById(id).populate("user");
       res.status(200).json({
          status:true,
          message:"review fetched successfully",
          review
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete review Review
const deleteAReview=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const review=await Review.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"review delete successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})

//update review successfully
const updateReviewStatus=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const review=await Review.findByIdAndUpdate(id,
         { isApproved:req.body.isApproved },
         { new:true }
        ); 
       res.status(200).json({
          status:true,
          message:"review updated successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})



module.exports={
    createReview,
    getAllReview,
    getAReview,
    deleteAReview,
    updateReviewStatus
}