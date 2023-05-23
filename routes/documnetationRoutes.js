const { postdoc, getAlldoc, deletedoc, updatedoc, getdoc } = require("../controllers/docCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");
const docRouter=require("express").Router();

docRouter.post("/",authMiddleware,restrictTo("Admin"),postdoc);
docRouter.get("/",getAlldoc);
docRouter.get("/:slug",getdoc);
docRouter.delete("/:id",deletedoc);
docRouter.put("/:id",authMiddleware,restrictTo("Admin"),updatedoc);

module.exports=docRouter;