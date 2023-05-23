const Work=require("../models/workWithUsModel");
const asynchandler=require("express-async-handler");
const { createOne , updateOne ,deleteOne, getOne, getAll } = require("./customCtrl");

const postDetails=createOne(Work);
const updateDetail=updateOne(Work);
const deleteDetail=deleteOne(Work);
const getdetail=getOne(Work);
const getAlldetails=getAll(Work);

module.exports={
    postDetails,
    updateDetail,
    deleteDetail,
    getdetail,
    getAlldetails
}