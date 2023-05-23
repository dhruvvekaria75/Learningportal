const mongoose=require("mongoose");

let docSchema=new mongoose.Schema({
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
    type:{
        type:String,
        default:"Devlopers corner",
    },
    author:{
        type:String,
        default:"Devlopers corner",
    },
    content:{
        type:String,
        required:true
    },
    keywords:{
        type:[],
        required:true
    },
    doc_image:{
        type:String,
        default:`https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg`
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Documentation",docSchema)