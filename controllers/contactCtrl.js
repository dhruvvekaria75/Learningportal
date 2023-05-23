const validateMongodbId = require("../config/validateMongodbId");
const Contact=require("../models/contactsModel");
const asynchandler=require("express-async-handler");

//create a contact
const createcontact=asynchandler(async(req,res)=>{ 
    try{
       const review=await Contact.create(req.body);
       res.status(200).json({
          status:true,
          message:"Enquiry form submit successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})

//get all review contact
const getAllcontact=asynchandler(async(req,res)=>{
    try{
       const contact=await Contact.find();
       res.status(200).json({
          status:true,
          message:"all Enquiry fetched successfully",
          contact
       })
    }catch(err){
        throw new Error(err);
    }
})

//get a single review Review
const getAcontcat=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const contact=await Contact.findById(id);
       res.status(200).json({
          status:true,
          message:"Enquiry fetched successfully",
          contact
       })
    }catch(err){
        throw new Error(err);
    }
})

//delete review Review
const deleteAcontact=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const contact=await Contact.findByIdAndDelete(id);
       res.status(200).json({
          status:true,
          message:"Enquiry delete successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})

//update contact successfully
const updateContactStatus=asynchandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const contact=await Contact.findByIdAndUpdate(id,
         { status:req.body.status },
         { new:true }
        ); 
       res.status(200).json({
          status:true,
          message:"conatct Enquriey updated successfully"
       })
    }catch(err){
        throw new Error(err);
    }
})


module.exports={
    createcontact,
    getAcontcat,
    getAllcontact,
    deleteAcontact,
    updateContactStatus
}