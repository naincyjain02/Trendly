const express=require('express');
const {handleReadComments,handleCreateComments, handleDeleteComment, handleUpdateComment,}=require('../controllers/commentcontroller');
const handleVerifyToken=require('../middlewares/auth');

const router=express.Router();

router.route("/:blogid").post(handleVerifyToken,handleCreateComments).get(handleReadComments);
router.route("/:commentid").patch(handleVerifyToken,handleUpdateComment).delete(handleVerifyToken,handleDeleteComment);













module.exports=router;