const asynchandler=require("express-async-handler");
const { default:slugify }=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");
const courseCategoryModel = require("../models/courseCategoryModel");


//post course category
const postcourseCategory=asynchandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const postcourseCat=await courseCategoryModel.create(req.body);
       res.status(200).json({
          status:true,
          message:"course Category created successfully",
          postcourseCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all course category
const getAllcourseCategories=asynchandler(async(req,res)=>{
    try{
       const allcoursecat=await courseCategoryModel.find();
       res.status(200).json({
          status:true,
          message:"course category fetched succesfully",
          allcoursecat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get single course
const getcourseCategories=asynchandler(async(req,res)=>{
    const {slug}=req.params;
    try{
       const findcourseCat=await courseCategoryModel.findOne({slug:slug});
       res.status(200).json({
          status:true,
          message:"course category found succesfully",
          findcourseCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete course
const deletecourseCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const deletecourseCat=await courseCategoryModel.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"course category deleted succesfully",
       })
    }catch(err){
        throw new Error(err);
    }
})

//update course category
const updatecourseCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{ 
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const updatecourseCat=await courseCategoryModel.findByIdAndUpdate(id,
           req.body,
           { new:true } 
        );
       res.status(200).json({
          status:true,
          message:"course category updated succesfully",
          updatecourseCat
       })
    }catch(err){
        throw new Error(err);
    }
})

module.exports={
   postcourseCategory,
   getAllcourseCategories,
   getcourseCategories,
   deletecourseCategories,
   updatecourseCategories
}