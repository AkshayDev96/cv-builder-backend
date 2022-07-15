const { sendError, verifyToken } = require("../helpers")


//validated the authorized user request
 const userAuth = (req,res,next)=>{
    if(!req?.user){
        return sendError(res,"Unauthorized user!",404)
    }

    //if req has user
    const user = req?.user
    if(!verifyToken(user?.token)){
        return sendError(res,"Token expired",404)
    }
    next()
}

module.exports = userAuth