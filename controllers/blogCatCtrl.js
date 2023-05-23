const asynchandler=require("express-async-handler");
const { default:slugify }=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");
const blogCatmodel = require("../models/blogCatmodel");

//post blog category
const postblogCategory=asynchandler(async(req,res)=>{
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const postblogCat=await blogCatmodel.create(req.body);
       res.status(200).json({
          status:true,
          message:"blog Category created successfully",
          postblogCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all blog category
const getAllblogCategories=asynchandler(async(req,res)=>{
    try{
       const allblogcat=await blogCatmodel.find();
       res.status(200).json({
          status:true,
          message:"blog category fetched succesfully",
          allblogcat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get single blog
const getblogCategories=asynchandler(async(req,res)=>{
    const {slug}=req.params;
    try{
       const findblogCat=await blogCatmodel.findOne({slug:slug});
       res.status(200).json({
          status:true,
          message:"blog category found succesfully",
          findblogCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete blog
const deleteblogCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const deleteblogCat=await blogCatmodel.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"blog category deleted succesfully",
       })
    }catch(err){
        throw new Error(err);
    }
})

//update blog category
const updateblogCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{ 
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
       const updateblogCat=await blogCatmodel.findByIdAndUpdate(id,
           req.body,
           { new:true } 
        );
       res.status(200).json({
          status:true,
          message:"blog category updated succesfully",
          updateblogCat
       })
    }catch(err){
        throw new Error(err);
    }
})

module.exports={
    postblogCategory,
    getAllblogCategories,
    getblogCategories,
    updateblogCategories,
    deleteblogCategories
}