const DocCategory=require("../models/docCatModel");
const asynchandler=require("express-async-handler");
const { default:slugify }=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");

//post doc category
const postDocCategory=asynchandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const postTutCat=await DocCategory.create(req.body);
       res.status(200).json({
          status:true,
          message:"Doc Category created successfully",
          postTutCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all doc category
const getAllDocCategories=asynchandler(async(req,res)=>{
    try{
       const alldoccat=await DocCategory.find();
       res.status(200).json({
          status:true,
          message:"Doc category fetched succesfully",
          alldoccat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get single doc
const getdocCategories=asynchandler(async(req,res)=>{
    const {slug}=req.params;
    try{
       const finddocCat=await DocCategory.findOne({slug:slug});
       res.status(200).json({
          status:true,
          message:"doc category found succesfully",
          finddocCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete doc
const deletedocCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const deleteTutCat=await DocCategory.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"Doc category deleted succesfully",
       })
    }catch(err){
        throw new Error(err);
    }
})

//update category
const updatedocCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{ 
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const updateTutCat=await DocCategory.findByIdAndUpdate(id,
           req.body,
           { new:true } 
        );
       res.status(200).json({
          status:true,
          message:"doc category updated succesfully",
          updateTutCat
       })
    }catch(err){
        throw new Error(err);
    }
})

module.exports={
    postDocCategory,
    getAllDocCategories,
    getdocCategories,
    deletedocCategories,
    updatedocCategories
}