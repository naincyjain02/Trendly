var jwt = require('jsonwebtoken');

const User = require("../models/User");

async function handleVerifyToken(req, res, next) {

  const token = req.cookies.Token;

  if (!token)
    res.json({ msg: "please login" });

  else {
    try {
      const user = await jwt.verify(token, process.env.SECRET_KEY);
      if (!user)
        return res.json({ msg: "user does not exist" });
      
      else {
        const user_find = await User.findById(user.id);
        if (!user_find)
          return res.json({ msg: "user does not exist" });

        req.user_id = user_find._id;

        next();
      }
    }
    catch (error) {
      return await res.json({ msg: "token is invalid" });
    }


  }

}





module.exports = handleVerifyToken;