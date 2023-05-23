const { postDetails, updateDetail, deleteDetail, getdetail, getAlldetails } = require("../controllers/workCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const workRouter=require("express").Router();

workRouter.post("/",postDetails);
workRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateDetail);
workRouter.delete("/:id",authMiddleware,restrictTo("Admin"),deleteDetail);
workRouter.get("/:id",authMiddleware,restrictTo("Admin"),getdetail);
workRouter.get("/",authMiddleware,restrictTo("Admin"),getAlldetails);
// workRouter.delete("/:id",deleteVideo);


module.exports=workRouter;

