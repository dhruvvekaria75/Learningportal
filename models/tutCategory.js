const mongoose=require("mongoose");

let tutCategorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    image:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("TutorialCategory",tutCategorySchema)