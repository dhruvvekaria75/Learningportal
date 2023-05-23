const Course=require("../models/courseModel");
const asynchandler=require("express-async-handler");
const validateMongodbId=require("../config/validateMongodbId");
const { default: slugify } = require("slugify");

//create a course
const createCourse=asynchandler(async(req,res)=>{
    const {_id}=req.user;
    validateMongodbId(_id);
    try{
      if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase());
      }
      if(_id){
        req.body.instructor=_id;
      }
      const course=await Course.create(req.body);
      res.status(200).json({
        statis:true,
        message:"Course created successfully",
        course
      })
    }catch(err){
       throw new Error(err);
    }
})

//get all courses 
const getAllcources=asynchandler(async(req,res)=>{
    try{
      const course=await Course.find();
      res.status(200).json({
        status:true,
        message:"All course fethched successfully",
        course
      })
    }catch(err){
     throw new Error(err);
    }
});

//update all courses 
const updatecources=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
      const course=await Course.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json({
        status:true,
        message:"course updated successfully",
        course
      })
    }catch(err){
     throw new Error(err);
    }
});

//delete courses 
const deletecources=asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
      const course=await Course.findByIdAndDelete(id);
      res.status(200).json({
        status:true,
        message:"course deleted successfully",
        course
      })
    }catch(err){
     throw new Error(err);
    }
});

//get a single courses 
const getAcources=asynchandler(async(req,res)=>{
    const {slug}=req.params
    try{
      const course=await Course.findOne({slug:slug});
      res.status(200).json({
        status:true,
        message:"single course fethched for particular category",
        course
      })
    }catch(err){
     throw new Error(err);
    }
});

const getParticularInstructorCourses=asynchandler(async(req,res)=>{
    const {_id}=req.user;
    console.log(_id);
    validateMongodbId(_id);
    try{
       const course=await Course.find({instructor:_id});
       res.status(200).json({status:true,message:"course fetched successfully",course});
    }catch(err){
       throw new Error(error);
    }
});

module.exports={
    createCourse,
    getAllcources,
    getAcources,
    updatecources,
    deletecources,
    getParticularInstructorCourses
};