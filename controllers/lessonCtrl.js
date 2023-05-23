const Lesson=require("../models/lessionModel");
const Course=require("../models/courseModel");
const asynchandler=require("express-async-handler");
const { default: slugify } = require("slugify");
const validateMongodbId = require("../config/validateMongodbId");

//create lesson for particular course
const createLesson=asynchandler(async (req,res)=>{
    const {courseId}=req.params;
    validateMongodbId(courseId);
    try{
      const findCourse=await Course.findById(courseId);
      //console.log(findCourse);
      if(findCourse){
         if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase());
         }
         const lesson=await Lesson.create(req.body);
         const updatecourse=await Course.findByIdAndUpdate(courseId,{$push:{lessons:lesson._id}},{new:true});
         res.status(200).json({status:true,message:"Lessonn Added to the course",lesson,updatecourse});
      }else{
        throw new Error("No course exist with this id");
      }
    }catch(err){
        throw new Error(err);
    }
});


//delete lesson
const deleteLession=asynchandler(async(req,res)=>{
    const {courseId,lessonId}=req.params;
    validateMongodbId(courseId);
    validateMongodbId(lessonId);
    try{
    const findCourse=await Course.findByIdAndUpdate(courseId,{$pull:{lessons:lessonId}},{new:true});
    const findlesson=await Lesson.findByIdAndDelete(lessonId);
    res.status(200).json({
      status:true,
      message:"Lession deleted",
      findCourse
    })}catch(err){
      throw new Error(err);
    }
});

//get a lesson
const getAlession=asynchandler(async(req,res)=>{
  const {lessonId}=req.params;
  validateMongodbId(lessonId);
  try{
     const lesson=await Lesson.findById(lessonId);
     res.status(200).json({
      status:true,
       message:"Lesson found",
       lesson
     })
  }catch(err){
     throw new Error(err);
  }
});

//get all lesson
const getAllcourseLesson=asynchandler(async(req,res)=>{
  const {courseId}=req.params;
  validateMongodbId(courseId);
  try{
     const lesson=await Course.findById(courseId).populate("lessons");
     res.status(200).json({
      status:true,
       message:"Lesson found",
       lesson
     })
  }catch(err){
     throw new Error(err);
  }
});

//update a lession
const updateAlession=asynchandler(async(req,res)=>{
  const {lessonId}=req.params;
   try{
      const lesson=await Lesson.findByIdAndUpdate(lessonId,req.body,{
        new:true
      });
      res.status(200).json({
        status:true,
        message:"Lesson updated",
        lesson
      })
   }catch(err){
     throw new Error(err);
   }
})


module.exports={
  createLesson,
  deleteLession,
  getAlession,
  getAllcourseLesson,
  updateAlession
};