const { sendError, objectId, sendResponse } = require('../helpers')
const userModel = require('../models/user')


//for changing layout
exports.changeLayout = async(req,res)=>{
    try{

     //validate request body
     if(!req?.body?.defaultLayout){
        return sendError(res,"layout name is missing!",400)
     }
      const userData = await userModel.findByIdAndUpdate({_id:objectId(req?.user?._id)},{defaultLayout:req?.body?.defaultLayout})
      if(!userData){
        return sendError(res,"User is not updated!",400)
      }
      return sendResponse(res,`CV ${req?.body?.defaultLayout} updated successfully!`,userData,200)
    }catch(e){
        return sendError(res,e?.message,500)
    }
}

//fileUploader
exports.uploadFile = (req,res)=>{
  const url = `${process.env.SERVER_URL}/uploads/${req?.file?.filename}`
  return sendResponse(res,"File uploaded",url,200)
}

//update cv details
exports.updateCv = async(req,res)=>{
  try{
    const userObj = await userModel.findByIdAndUpdate({_id:objectId(req?.user?._id)},{$set:req.body},{$new:true})
    return sendResponse(res,'Cv details updated!',userObj,200)
  }catch(e){
    return sendError(res,e?.message,500)
  }
}

//Get user info
exports.getUserInfo = async(req,res)=>{
  try{
    const userData = await userModel.findById({_id:objectId(req.user?._id)})
    return sendResponse(res,'User info fetched!',userData,200)
  }catch(e){
    return sendError(res,e?.message,500)
  }
}