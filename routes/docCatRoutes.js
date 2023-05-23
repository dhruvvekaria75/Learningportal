const { postDocCategory, getAllDocCategories, getdocCategories, updatedocCategories, deletedocCategories } = require("../controllers/docCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const docCatRouter=require("express").Router();

docCatRouter.post('/',authMiddleware,restrictTo("Admin"),postDocCategory);
docCatRouter.get('/all',getAllDocCategories);
docCatRouter.get('/:slug',authMiddleware,restrictTo("Admin"),getdocCategories);
docCatRouter.put('/:id',authMiddleware,restrictTo("Admin"),updatedocCategories);
docCatRouter.delete('/:id',authMiddleware,restrictTo("Admin"),deletedocCategories);

module.exports=docCatRouter;