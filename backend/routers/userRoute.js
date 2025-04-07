const express=require("express");
const {handleUserRegister,handleUserLogin,handleGetUser,handleUpdateUser,handleDeleteUser,handleUploadImage,handleGetAllUsers}=require('../controllers/usercontroller');
const handleVerifyToken =require("../middlewares/auth");
const upload=require("../middlewares/image");
const router=express.Router();

router.route("/register").post(handleUserRegister);
router.route("/login").post(handleUserLogin);
router.route("/all").get(handleGetAllUsers);
router.route("/").get(handleVerifyToken,handleGetUser).patch(handleVerifyToken,handleUpdateUser).delete(handleVerifyToken,handleDeleteUser);
router.route("/upload").post(handleVerifyToken,upload.single("image"),handleUploadImage);












module.exports=router;