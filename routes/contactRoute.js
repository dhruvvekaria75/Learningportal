const { createcontact, getAllcontact, getAcontcat, deleteAcontact, updateContactStatus } = require("../controllers/contactCtrl");
const { authMiddleware, restrictTo } = require("../middlewares/authMiddleware");

const contactRouter=require("express").Router();

contactRouter.post("/",authMiddleware,createcontact);
contactRouter.get("/",getAllcontact);
contactRouter.get("/:id",authMiddleware,restrictTo("Admin"),getAcontcat);
contactRouter.delete("/:id",authMiddleware,restrictTo("Admin"),deleteAcontact);
contactRouter.put("/:id",authMiddleware,restrictTo("Admin"),updateContactStatus);

module.exports=contactRouter;