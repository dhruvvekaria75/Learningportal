const mongoose=require("mongoose");

const dbConnect=()=>{
    try {
      const connection=mongoose.connect(process.env.MONGODB_URI);
      console.log("database connection successfully")
    } catch(err){
      console.log(err)
    }
}
module.exports=dbConnect;