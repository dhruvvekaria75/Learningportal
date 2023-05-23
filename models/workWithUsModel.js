const mongoose=require("mongoose");

let workwithusSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    currentjob:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true,
    },
  
},{
    timestamps:true
})

module.exports=mongoose.model("Work",workwithusSchema)