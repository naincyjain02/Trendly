
const mongoose=require('mongoose');






async function connectToMondodb(url){

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

}


module.exports={
    connectToMondodb,
};