const { postvideo, getVideo, getAllVideo, deleteVideo, updateVideo } = require("../controllers/videoCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const videoRouter=require("express").Router();

videoRouter.post("/",authMiddleware,restrictTo("Admin"),postvideo);
videoRouter.get("/:slug",getVideo);
videoRouter.get("/",getAllVideo);
videoRouter.delete("/:id",deleteVideo);
videoRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateVideo);

module.exports=videoRouter;


