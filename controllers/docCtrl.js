const Doc=require("../models/documentationModel");
const asynchandler=require("express-async-handler");
const {default:slugify}=require("slugify");
const validateMongodbId = require("../config/validateMongodbId");

//create or post doc
const postdoc=asynchandler(async (req,res)=>{
    try{
      if(req.body.title){
        req.body.slug=slugify(req.body.title.toLowerCase())
        }
       const doc=await Doc.create(req.body);
       res.status(200).json({
          sttaus:true,
          messgae:"documentation posted successfully",
          doc
       })
   }catch(err){
        throw new Error(err);
    }
});

//get a sinle doc
const getdoc=asynchandler(async (req,res)=>{
  const {slug}=req.params
  try{
       const doc=await Doc.findOne({slug:slug});
       res.status(200).json({
          sttaus:true,
          messgae:"doc found successfully",
          doc
       })
   }catch(err){
        throw new Error(err);
    }
});

//get all doc
const getAlldoc=asynchandler(async (req,res)=>{
    try{
        const doc=await Doc.find();
        res.status(200).json({
            sttaus:true,
            messgae:"All doc found successfully",
            doc
         })
     }catch(err){
          throw new Error(err);
      }
  });

//update doc
const updatedoc=asynchandler(async (req,res)=>{
    const { id }=req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug=slugify(req.body.title.toLowerCase())
         }
        const doc=await Doc.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            status:true,
            messgae:"doc Updated successfully",
            doc
         })
     }catch(err){
          throw new Error(err);
      }
  });

 //delete a documentation
const deletedoc=asynchandler(async (req,res)=>{
    const {id}=req.params
    try{
         const doc=await Doc.findByIdAndDelete(id);
         res.status(200).json({
            sttaus:true,
            messgae:"doc deleted successfully",
            doc
         })
     }catch(err){
          throw new Error(err);
      }
  });

  module.exports={
    postdoc,
    getdoc,
    getAlldoc,
    deletedoc,
    updatedoc
  }