const TutorialCategory=require("../models/tutCategory");
const asynchandler=require("express-async-handler");
const {default:slugify}=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");


//post tutorial category
const postTutorialCategory=asynchandler(async(req,res)=>{
    try{
       if(req.body.title){
          req.body.slug=slugify(req.body.title.toLowerCase());
       }
       const postTutCat=await TutorialCategory.create(req.body);
       res.status(200).json({
          status:true,
          message:"Turtoria Category created successfully",
          postTutCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all tutorial category
const getAllTutCategories=asynchandler(async(req,res)=>{
    try{
       const alltutcat=await TutorialCategory.find();
       res.status(200).json({
          status:true,
          message:"Tutorial category fetched succesfully",
          alltutcat
       })
    }catch(err){
        throw new Error(err);
    }
})

//get single category
const getTutCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const findTutCat=await TutorialCategory.findById(id);
       res.status(200).json({
          status:true,
          message:"Tutorial category found succesfully",
          findTutCat
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete category
const deleteTutCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const deleteTutCat=await TutorialCategory.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"Tutorial category deletedsuccesfully",
       })
    }catch(err){
        throw new Error(err);
    }
})

//update category
const updateTutCategories=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{ 
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
        }
       const updateTutCat=await TutorialCategory.findByIdAndUpdate(id,
           req.body,
           { new:true } 
        );
       res.status(200).json({
          status:true,
          message:"Tutorial category updated succesfully",
          updateTutCat
       })
    }catch(err){
        throw new Error(err);
    }
})



module.exports={
    postTutorialCategory,
    getAllTutCategories,
    getTutCategories,
    deleteTutCategories,
    updateTutCategories
}