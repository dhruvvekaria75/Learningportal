const asynchandler=require("express-async-handler");
const { default:slugify }=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");
const videoCatmodel = require("../models/videoCatmodel");

//post video category
const postvideoCategory=asynchandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const postvideoCat=await videoCatmodel.create(req.body);
       res.status(200).json({
          status:true,
          message:"video Category created successfully",
          postvideoCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all video category
const getAllvideoCategories=asynchandler(async(req,res)=>{
    try{
       const allvideocat=await videoCatmodel.find();
       res.status(200).json({
          status:true,
          message:"video category fetched succesfully",
          allvideocat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get single video
const getvideoCategories=asynchandler(async(req,res)=>{
    const {slug}=req.params;
    try{
       const findvideoCat=await videoCatmodel.findOne({slug:slug});
       res.status(200).json({
          status:true,
          message:"video category found succesfully",
          findvideoCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete video
const deletevideoCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const deletevideoCat=await videoCatmodel.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"video category deleted succesfully",
       })
    }catch(err){
        throw new Error(err);
    }
})

//update video category
const updatevideoCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{ 
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const updatevideoCat=await videoCatmodel.findByIdAndUpdate(id,
           req.body,
           { new:true } 
        );
       res.status(200).json({
          status:true,
          message:"video category updated succesfully",
          updatevideoCat
       })
    }catch(err){
        throw new Error(err);
    }
})

module.exports={
    postvideoCategory,
    getAllvideoCategories,
    getvideoCategories,
    updatevideoCategories,
    deletevideoCategories
}