const { createReview, getAllReview, getAReview, deleteAReview, updateReviewStatus } = require("../controllers/reviewCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const reviewRouter=require("express").Router();

reviewRouter.post("/",authMiddleware,createReview);
reviewRouter.get("/",getAllReview);
reviewRouter.get("/:id",authMiddleware,restrictTo("Admin"),getAReview);
reviewRouter.delete("/:id",authMiddleware,restrictTo("Admin"),deleteAReview);
reviewRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateReviewStatus);

module.exports=reviewRouter;