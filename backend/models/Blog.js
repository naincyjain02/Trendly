const mongoose=require('mongoose');



const blogSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    image:{
        type:String,
       
    },
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const Blog=mongoose.model("Blog",blogSchema);

module.exports=Blog;