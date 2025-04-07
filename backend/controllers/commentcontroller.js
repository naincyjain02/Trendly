
const Blog = require('../models/Blog');
const Comment=require('../models/Comment');



async function handleCreateComments(req,res){

    try{
      const userid=req.user_id;
      const blogid=req.params.blogid;
    
    
    
      const comment=await Comment.create({
           content:req.body.content,
           blog:blogid,
           owner:userid
      });
    
      
      if(!comment)
       return await res.json({msg:"comment do not exist"});
    
      res.json(comment);
    
    }
    catch(error){
     console.log(error);
    }
    
    
    }
    
    async function handleUpdateComment(req,res){
        
      try{

             const commentid=req.params.commentid;
             const userid=req.user_id;
             const content=req.body.content;

            const comment=await Comment.findById(commentid);

            if(!comment)
                return await res.json({msg:"comment do not exist"});

            console.log(comment);
            console.log(userid);

            if((comment.owner).toString()===userid.toString())
          {
            const Com=await Comment.findByIdAndUpdate(commentid,{$set:{content}},{new:true,runValidators:true});
             res.json(Com);

          }
             
            else

                return await res.json({msg:"you are not permitted to update this comment"});

                

      }

      catch(error){
          console.log(error);
      }
     
       
    
    }
    
    async function handleDeleteComment(req,res){
     try{
        const commentid=req.params.commentid;
        const userid=req.user_id;
        

       const comment=await Comment.findById(commentid);

       if(!comment)
           return await res.json({msg:"comment do not exist"});

       const blog=await Blog.findById(comment.blog);
       if(!blog)
           return await res.json({msg:"blog do not exist"});

       if(comment.owner.toString()===userid.toString()||(blog.owner.toString()===userid.toString()))

        {await Comment.findByIdAndDelete(commentid);
         return res.json({msg:"comment deleted successfully"})
        }    
        
       else

           return await res.json({msg:"you are not permitted to delete this comment"});

     }
     catch(error){
      console.log(error);
     }
    
    }

    
    async function handleReadComments(req,res){
         
        try{
             const blogid=req.params.blogid;

             const comments=await Comment.find({blog:blogid});

             if(!comments)
                return res.json({message:"no comments found for this blog"});

             res.json(comments);
        }
        catch(error){

            console.log(error);
        }


    }

    module.exports={
        handleReadComments,
        handleCreateComments,
        handleUpdateComment,
        handleDeleteComment,

    }