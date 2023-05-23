const asynchandler=require("express-async-handler");
const validateMongodbId=require("../config/validateMongodbId");
const ApiFeatures=require("../utils/apiFeatures")

//craete whole table 
const createOne=(Model)=>{
    return asynchandler(async(req,res)=>{
        try{
          const detail=await Model.create(req.body);
          res.status(200).json({
            status:true,
            message:"Posted",
            detail
          })  
        }catch(err){
          throw new Error(err);
        }
    })
};

//update table
const updateOne=(Model)=>{
   return asynchandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
       const data=await Model.findByIdAndUpdate(id,req.body,{name:true});
       res.status(200).json({
         status:true,
         message:"Updated Successfully",
         data
        })
    }catch(err){
        throw new Error(err);
     }
   })
};

//delete table
const deleteOne=(Model)=>{
    return asynchandler(async(req,res)=>{
     const {id}=req.params;
     validateMongodbId(id);
     try{
        const data=await Model.findByIdAndDelete(id);
        res.status(200).json({
          status:true,
          message:"deleted Successfully",
          data
         })
     }catch(err){
         throw new Error(err);
      }
    })
 };

 //get table
const getOne=(Model,populateOptions)=>{
    return asynchandler(async(req,res)=>{
     const {slug,id}=req.params;
     validateMongodbId(id);
     try{
        let query;
        if(id){
           query=Model.findById(id);
        }
        if(slug){
          query=Model.findOne({slug:slug})
        }
        if(populateOptions){
          query=query.populate(populateOptions);
        }
        const data=await query
        res.status(200).json({
          status:true,
          message:"fetched Successfully",
          data
         })
     }catch(err){
         throw new Error(err);
      }
    })
 };

const getAll=(Model)=>{
    return asynchandler(async(req,res)=>{
      try{
        let filter={};
        const features=new ApiFeatures(Model.find(filter),req.query).filter().sort().limitFields().paginate();

        const data=await features.query;
        res.status(200).json({
            status:true,
            message:"Fetch data successfully",
            data
         })}
      catch(err){
          throw new Error(err);
      }
    })
}
module.exports={ 
    createOne,
    updateOne,
    deleteOne,
    getOne,
    getAll
 }