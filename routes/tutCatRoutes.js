const {postTutorialCategory, getAllTutCategories, getTutCategories, updateTutCategories, deleteTutCategories}=require("../controllers/tutCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const tutCatRouter=require("express").Router();

tutCatRouter.post('/post',authMiddleware,restrictTo("Admin"),postTutorialCategory);
tutCatRouter.get('/',getAllTutCategories);
tutCatRouter.get('/:id',authMiddleware,restrictTo("Admin"),getTutCategories);
tutCatRouter.put('/:id',authMiddleware,restrictTo("Admin"),updateTutCategories);
tutCatRouter.delete('/:id',authMiddleware,restrictTo("Admin"),deleteTutCategories);

module.exports=tutCatRouter;