const express=require('express');
const dotenv=require('dotenv');
const app=express();
const {connectToMondodb}=require('./connection/connection');
const userRouter=require('./routers/userRoute');
const blogRouter=require('./routers/blogRoute');
const commentRouter=require('./routers/commentRoute');
const { urlencoded } = require('body-parser');
const cookieParser=require('cookie-parser');
const cors = require('cors');


dotenv.config();
const PORT=process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


connectToMondodb(process.env.URL);



app.use("/user",userRouter);
app.use('/blog',blogRouter);
app.use('/comment',commentRouter);


app.listen(PORT,(req,res)=>{

    console.log(`server is running on PORT ${PORT}`);
})