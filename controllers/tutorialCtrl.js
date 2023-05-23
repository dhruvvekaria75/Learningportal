const Tutorial=require("../models/tutorialModel");
const asynchandler=require("express-async-handler");
const {default:slugify}=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");

//post tutorial 
const PostTutorial=asynchandler(async(req,res)=>{
    try{
    //  console.log(req.body.title);
    //  console.log(req.body.tutorialCategory);
      if(req.body.title){
         req.body.slug=slugify(req.body.title.toLowerCase());
      }
      if(req.body.tutorialCategory){
        req.body.tutorialCategorySlug=slugify(req.body.tutorialCategory.toLowerCase());
      }
     const postTut=await Tutorial.create(req.body);
     res.status(200).json({
        status:true,
        message:"Tutorial created successfully",
        postTut
     })
    }catch(err){
        throw new Error(err);
    }
})

//get a single tutorial and tutorialtopics
const getATutorial=asynchandler(async(req,res)=>{
    try{
     const {type,slug}=req.params;
     const getTut=await Tutorial.findOne({
        slug:slug,
        tutorialCategorySlug:type
     });
     const tutorialTopics=await Tutorial.find({tutorialCategorySlug:type})
          .select("topicName title slug tutorialCategorySlug")
          .sort("createdAt");

     res.status(200).json({
        status:true,
        message:"Data fetched",
        getTut,
        tutorialTopics
     })
    }catch(err){
        throw new Error(err);
    }
})

//update a tutorial
const updateTutorial=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
          }
        if(req.body.tutorialCategory){
           req.body.tutorialCategorySlug=slugify(req.body.tutorialCategory.toLowerCase());
         }
    
    const updateTutorial=await Tutorial.findByIdAndUpdate(id,req.body,{new:true});

     res.status(200).json({
        status:true,
        message:"tutorial updated successfully",
        updateTutorial
     })
    }catch(err){
        throw new Error(err);
    }
})

//delete a tutorial
const deleteTutorial=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
    const deleteTutorial=await Tutorial.findByIdAndDelete(id);
     res.status(200).json({
        status:true,
        message:"tutorial deleted successfully",
        deleteTutorial
     })
    }catch(err){
        throw new Error(err);
    }
})

//find all tutorial
const allTutorial=asynchandler(async(req,res)=>{
    try{
     const allTut=await Tutorial.find();
     res.status(200).json({
        status:true,
        message:"tutorial find successfully",
        allTut
     })
    }catch(err){
        throw new Error(err);
    }
})

module.exports={
    PostTutorial,
    getATutorial,
    updateTutorial,
    deleteTutorial,
    deleteTutorial,
    allTutorial
};