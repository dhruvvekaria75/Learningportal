const mongoose=require("mongoose");

let lessonSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3,
        unique:true,
        maxlength:350,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        minlength:200,
    },
    video:{
        type:String,
    },
    free_preview:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Lesson",lessonSchema)