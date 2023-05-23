const asynchandler=require("express-async-handler");
const {default:slugify}=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");
const blogmodel = require("../models/blogmodel");

//create or post blog
const postblog=asynchandler(async (req,res)=>{
    try{
      if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
        }
       const blog=await blogmodel.create(req.body);
       res.status(200).json({
          sttaus:true,
          messgae:"blog posted successfully",
          blog
       })
   }catch(err){
        throw new Error(err);
    }
});

//get a blog
const getblog=asynchandler(async (req,res)=>{
  const {slug}=req.params
  try{
       const blog=await blogmodel.findOne({slug:slug});
       res.status(200).json({
          sttaus:true,
          messgae:"blog found successfully",
          blog
       })
   }catch(err){
        throw new Error(err);
    }
});

//get all blog
const getAllblog=asynchandler(async (req,res)=>{
    try{
        const blog=await blogmodel.find();
        res.status(200).json({
            sttaus:true,
            messgae:"All blog found successfully",
            blog
         })
     }catch(err){
          throw new Error(err);
      }
  });

//update blog
const updateblog=asynchandler(async (req,res)=>{
    const { id }=req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase())
         }
        const blog=await blogmodel.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            status:true,
            messgae:"blog Updated successfully",
            blog
         })
     }catch(err){
          throw new Error(err);
      }
  });

 //delete a video
const deleteblog=asynchandler(async (req,res)=>{
    const {id}=req.params
    try{
         const blog=await blogmodel.findByIdAndDelete(id);
         res.status(200).json({
            sttaus:true,
            messgae:"blog deleted successfully",
            blog
         })
     }catch(err){
          throw new Error(err);
      }
  });

  module.exports={
     postblog,
     getAllblog,
     getblog,
     updateblog,
     deleteblog
  }