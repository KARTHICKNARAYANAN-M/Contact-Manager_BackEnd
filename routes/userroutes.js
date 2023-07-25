const express=require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/usercontroller");
const validateToken = require("../middleware/validatetokenhandler");
const router=express.Router();

router.get("/current",validateToken,currentUser)
router.post("/register",registerUser)
router.post("/login",loginUser)



module.exports=router;