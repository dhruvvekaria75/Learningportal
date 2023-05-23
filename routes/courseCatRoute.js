const { postcourseCategory, getAllcourseCategories, getcourseCategories, updatecourseCategories, deletecourseCategories } = require("../controllers/courseCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const courseCatRouter=require("express").Router();

courseCatRouter.post('/',authMiddleware,restrictTo("Admin","Instructor"),postcourseCategory);
courseCatRouter.get('/all',getAllcourseCategories);
courseCatRouter.get('/:slug',getcourseCategories);
courseCatRouter.put('/:id',authMiddleware,restrictTo("Admin","Instructor"),updatecourseCategories);
courseCatRouter.delete('/:id',authMiddleware,restrictTo("Admin","Instructor"),deletecourseCategories);

module.exports=courseCatRouter;