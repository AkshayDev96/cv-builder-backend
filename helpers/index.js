const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

// for update and delete and get and all use this objectid
exports.objectId = mongoose.Types.ObjectId;

//for making schema ref as objectIdType
exports.ModelObjectId = mongoose.Schema.Types.ObjectId;

exports.encode = (data) => {
  return CryptoJS.AES.encrypt(data, "secret key 123").toString();
};

exports.decode = (data) => {
  var bytes = CryptoJS.AES.decrypt(data, "secret key 123");
  return bytes.toString(CryptoJS.enc.Utf8);
};

exports.sendResponse = (res, message, data, status) => {
  return res.status(status).json({
    message,
    data,
  });
};

exports.sendError = (res, data, status) => {
  console.log("ERROR", data);
  return res.status(status).json({
    errorMessage: data,
  });
};

exports.genToken = (data)=>{
return token = jwt.sign({
  data: data
}, 'secret', { expiresIn: "24h" });
}

exports.verifyToken = (data)=>{
  return jwt.verify(data, 'secret', function(err, decoded) {
   if(err||!decoded){
     return false
   }
   return decoded
  });
}
