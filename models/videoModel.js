const mongoose=require("mongoose");
const { getTutCategories } = require("../controllers/tutCatCtrl");

let videoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg"
    },
    description:{
        type:String,
        required:true
    },
    video_url:{
        type:String,
        required:true,
    },
    keywords:{
        type:[],
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("CVideo",videoSchema)