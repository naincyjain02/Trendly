const Blog = require("../models/Blog");


async function handleCreateBlog(req, res) {
  try {
    const { heading, content } = req.body;
    const id = req.user_id;


    if (!heading || !content)
      res.json("either heading or content is missing");

    const blog = await Blog.create({
      heading,
      content,
      owner: id,
    });

    res.json({ msg: "blog created successfully" });
  }
  catch (error) {
    console.log("An error occurred", error);
  }

}

async function handleReadAllBlog(req, res) {
  try {
    const allBlogs = await Blog.find({});

    if (!allBlogs)
      res.json({ msg: "There are no Blogs available" });

    else
      res.json(allBlogs);
  }
  catch (error) {
    console.log("An error occured", error);
  }

}

async function handleReadBlog(req, res) {

  const id = req.params.id;

  try {
    const blog = await Blog.findById(id).populate('likes');

    

    if (!blog)
      res.json({ msg: "blog does not exist" });

    else
      res.json(blog);

  }
  catch (error) {
    console.log("An error occurred ", error);
  }

}

async function handleUpdateBlog(req, res) {

  const id = req.params.id;
  const user_id = req.user_id;
  const data = req.body;
  try {

    const blog = await Blog.findOne({ _id: id, owner: user_id });


    if (!blog)
      return await res.json({ msg: "you are not permitted to update this blog." });

    const updated_blog = await Blog.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    res.json(updated_blog);


  }
  catch (error) {
    console.log("An error occurred ", error);
  }

}

async function handleDeleteBlog(req, res) {
  const id = req.params.id;

  const user_id = req.user_id;

  try {



    const blog = await Blog.findOne({ _id: id, owner: user_id });

    if (!blog) {
      return await res.json({ msg: "you are not permitted to delete this blog." })
    }
    await Blog.findByIdAndDelete(id);
    res.json({ msg: "Blog deleted Successfully" });


  }
  catch (error) {
    console.log("An error occurred ", error);
  }

}


async function handleCreateLikes(req,res){

        try{
           const id=req.user_id;

           const blog_id=req.params.id;

           const blog=await Blog.findByIdAndUpdate(blog_id,{$push:{likes:id}},{new:true,useFindAndModify: false});

           if(!blog)
            return await res.json({msg:"blog do not exist"});

           res.json(blog);

        }
        catch(error){
          console.log(error);
        }
}




module.exports = {
  handleCreateBlog,
  handleReadAllBlog,
  handleReadBlog,
  handleUpdateBlog,
  handleDeleteBlog,
  handleCreateLikes,
 

}