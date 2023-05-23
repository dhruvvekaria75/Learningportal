const { postvideoCategory, getAllvideoCategories, getvideoCategories, updatevideoCategories, deletevideoCategories } = require("../controllers/videoCatCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
const videoCatRouter=require("express").Router();

videoCatRouter.post('/',authMiddleware,restrictTo("Admin"),postvideoCategory);
videoCatRouter.get('/all',getAllvideoCategories);
videoCatRouter.get('/:slug',authMiddleware,restrictTo("Admin"),getvideoCategories);
videoCatRouter.put('/:id',authMiddleware,restrictTo("Admin"),updatevideoCategories);
videoCatRouter.delete('/:id',authMiddleware,restrictTo("Admin"),deletevideoCategories);

module.exports=videoCatRouter;