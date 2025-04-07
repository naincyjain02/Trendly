const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



async function handleUserRegister(req, res) {
    try {

        const { name, username, email, password } = req.body;

        console.log(req.body.formData);

        if (!name || !username || !email || !password) {
            res.json({ msg: "Please fill all the fields." });
        }



        const hashedPassword = await bcrypt.hash(password, 10);




        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return await res.json(user);
    }
    catch (error) {
        console.log("An error occured ", error);
    }

};


async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) res.json({ msg: "either email or password is missing" });

        const user = await User.findOne({ email });

        if (!user)
            res.json({ msg: "user does not exist" });

        const result = await bcrypt.compare(password, user.password);
        if (result == true) {
            const id = user._id;
            
            var token = jwt.sign({ id, email }, process.env.SECRET_KEY);
            res.cookie("Token", token,{
                httpOnly: true, // This prevents client-side JavaScript from accessing the cookie
                secure: true, // Ensures the cookie is sent over HTTPS only
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiry
                sameSite: 'Strict' // Ensures the cookie is not sent with cross-site requests
            });
            res.json({ msg: 'user logged in with token ', token });
        }
        else
            res.json({ msg: 'either email or password is wrong' });

    }
    catch (error) {
        console.log("An error occurred ", error);
    }

}

async function handleGetUser(req,res){

    try{
        const id=req.user_id;

        const user=await User.findById(id);

        if(!user)
            return await res.json({msg:"user not found"});

        res.json(user);
    }
    catch(error){
        console.log(error);
    }

}

async function handleUpdateUser(req,res){

    try{
       const id=req.user_id;

       const data=req.body;

       if(data.password){
         data.password=await bcrypt.hash(data.password, 10);
       }

       const user=await User.findByIdAndUpdate(id,{$set:data},{new:true,runValidators:true});

       if(!user)
        return await res.json({msg:"user not found"});

       res.json(user);
    }
    catch(error){
        console.log(error);
    }

}


async function handleDeleteUser(req,res){
    try{
        const id=req.user_id;

        const user=await User.findByIdAndDelete(id);

        if(!user)
            return await res.json({msg:"user not found"});

        res.json({msg:"user deleted successfully"});
    }
    catch(error){
        console.log(error);
    }


}
async function handleUploadImage(req,res){

   

    try{
        const id=req.user_id;

        const image_url=req.file.path;
        console.log(image_url);
        
        const user=await User.findByIdAndUpdate(id,{$set:{image_url}},{new:true,runValidators:true});

        if(!user){
          return  res.status(404).json({msg:"user not found"});
        }

        res.json({msg:"image uploaded successfully"});
    }
    catch(error){
      console.log(error);
    }
}

async function handleGetAllUsers(req,res){
    
    try{
        const users=await User.find({});

        if(!users){
            return await res.json({msg:"users do not exist"});
        }

        res.json(users);

    }
    catch(error){
        console.log(error);
    }

}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleGetUser,
    handleUpdateUser,
    handleDeleteUser,
    handleUploadImage,
    handleGetAllUsers
}