const express=require("express");
const router=express.Router();
const {getContacts,
       createContact,
       getContact,
       updateContact,
       deleteContact,
}=require("../controllers/contactcontroller");
const validateToken = require("../middleware/validatetokenhandler");

router.use(validateToken);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
router.route("/").get(getContacts).post(createContact);




module.exports=router;


