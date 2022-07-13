const mongoose = require('mongoose')

module.exports = async()=>{
    try{
       return await mongoose.connect(`mongodb+srv://admin:admin@cluster0.tt227.mongodb.net/cvbuilder?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
       }).then(e=>e).catch((e)=>{throw e})
    }catch(e){
        console.log(e)
        return e.message
    }
}