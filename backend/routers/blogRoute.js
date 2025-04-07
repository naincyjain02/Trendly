const express=require("express");
const {handleCreateBlog,handleReadAllBlog,handleReadBlog,handleUpdateBlog,handleDeleteBlog,handleCreateLikes}=require('../controllers/blogcontroller');
const handleVerifyToken=require("../middlewares/auth");

const router=express.Router();

router.route("/create").post(handleVerifyToken,handleCreateBlog);
router.route("/").get(handleReadAllBlog);
router.route("/:id").get(handleVerifyToken,handleReadBlog).patch(handleVerifyToken,handleUpdateBlog).delete(handleVerifyToken,handleDeleteBlog);
router.route("/like/:id").patch(handleVerifyToken,handleCreateLikes);















module.exports=router;