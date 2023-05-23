const { postblog, getblog, getAllblog, deleteblog, updateblog } = require("../controllers/blogCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const blogRouter=require("express").Router();

blogRouter.post("/",authMiddleware,restrictTo("Admin"),postblog);
blogRouter.get("/:slug",getblog);
blogRouter.get("/",getAllblog);
blogRouter.delete("/:id",deleteblog);
blogRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateblog);

module.exports=blogRouter;

