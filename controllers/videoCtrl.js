const Video=require("../models/videoModel");
const asynchandler=require("express-async-handler");
const {default:slugify}=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");

//create or post video
const postvideo=asynchandler(async (req,res)=>{
    try{
      if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
        }
       const video=await Video.create(req.body);
       res.status(200).json({
          sttaus:true,
          messgae:"Video posted successfully",
          video
       })
   }catch(err){
        throw new Error(err);
    }
});

//get a video
const getVideo=asynchandler(async (req,res)=>{
  const {slug}=req.params
  try{
       const video=await Video.findOne({slug:slug});
       res.status(200).json({
          sttaus:true,
          messgae:"Video found successfully",
          video
       })
   }catch(err){
        throw new Error(err);
    }
});

//get all video
const getAllVideo=asynchandler(async (req,res)=>{
    try{
        const video=await Video.find();
        res.status(200).json({
            sttaus:true,
            messgae:"All Video found successfully",
            video
         })
     }catch(err){
          throw new Error(err);
      }
  });

//update video
const updateVideo=asynchandler(async (req,res)=>{
    const { id }=req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase())
         }
        const video=await Video.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            status:true,
            messgae:"video Updated successfully",
            video
         })
     }catch(err){
          throw new Error(err);
      }
  });

 //delete a video
const deleteVideo=asynchandler(async (req,res)=>{
    const {id}=req.params
    try{
         const video=await Video.findByIdAndDelete(id);
         res.status(200).json({
            sttaus:true,
            messgae:"Video deleted successfully",
            video
         })
     }catch(err){
          throw new Error(err);
      }
  });

  module.exports={
     postvideo,
     getAllVideo,
     getVideo,
     updateVideo,
     deleteVideo
  }