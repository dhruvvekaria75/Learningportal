const { authenticate } = require("passport");
const { authMiddleware, restrictTo} = require("../middlewares/authMiddleware"); 
const { PostTutorial, getATutorial, updateTutorial, allTutorial, deleteTutorial } = require("../controllers/tutorialCtrl");

const tutorialRouter=require("express").Router();

tutorialRouter.post("/",authMiddleware,restrictTo("Admin"),PostTutorial)
tutorialRouter.get("/:type/:slug",getATutorial);
tutorialRouter.get("/",authMiddleware,restrictTo("Admin"),allTutorial);
tutorialRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateTutorial);
tutorialRouter.delete("/:id",authMiddleware,restrictTo("Admin"),deleteTutorial);

module.exports=tutorialRouter