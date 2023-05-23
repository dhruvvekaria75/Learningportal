const { postblogCategory, getAllblogCategories, getblogCategories, updateblogCategories, deleteblogCategories } = require("../controllers/blogCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const blogCatRouter=require("express").Router();

blogCatRouter.post('/',authMiddleware,restrictTo("Admin"),postblogCategory);
blogCatRouter.get('/all',getAllblogCategories);
blogCatRouter.get('/:slug',authMiddleware,restrictTo("Admin"),getblogCategories);
blogCatRouter.put('/:id',authMiddleware,restrictTo("Admin"),updateblogCategories);
blogCatRouter.delete('/:id',authMiddleware,restrictTo("Admin"),deleteblogCategories);

module.exports=blogCatRouter;