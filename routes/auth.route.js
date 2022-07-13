const route = require('express').Router()
const passport = require('passport')
const { sendError, sendResponse, encode } = require('../helpers')
const userModel = require('../models/user')

//For Google Signup/login
route.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))
route.get('/google/callback', passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/login`
}))

//For Facebook Signup/login
route.get("/facebook", passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }))
route.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/login`
}))

//For logout session
route.get('/logout', function (req, res){
    req.session.destroy(function (err) {
      res.redirect(process.env.CLIENT_URL); //Inside a callback… bulletproof!
    });
});
  


//For login check
route.get("/checkLogin", (req, res) => {
    if(req.user && req.isAuthenticated()){
     return  sendResponse(res,"User logged-in",{user:req?.user},200)
    }else{
        console.log("-------------user",req.user)
        return sendError(res,"User not authenticated!",401)
    }
})

//for Normal login
route.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(401).json({errorMessage:err});
        }

        if (!user) {
            return res.status(400).json({errorMessage:"Invalid user"});
        }

        req.logIn(user, function(err) {
            if (err) {
            console.log("err2",err)
                return next(err);
            }

            return res.status(200).json({message:"User logged-in successfully!"});
        });
    })(req, res, next);
});


//for register new user while signup
route.post('/register',(req,res)=>{
    const {username,email,contactNo} = req.body
  return userModel.find({email})
    .then(async(userData)=>{
        if(userData?.length>0){
            return sendError(res,"Email already taken!",400)
        }
        const existsUsername = await userModel.find({username}).limit(1)
        if(existsUsername?.length>0){
            return sendError(res,"Username already taken!",400)
        }
        
        if(req.body?.password){
          req.body.password = encode(req.body.password)
        }
        const userObj = new userModel({username,email,contactNo,password:req.body?.password})
        userObj.save()
        .then((user)=>{
            return sendResponse(res,"Signed up successfully!",user,200)
        }).catch((e)=>{
           return sendError(res,e.message,400)
        })
    }).catch((e)=>{
         return sendError(res,e.message,400)
    })
})

module.exports = route