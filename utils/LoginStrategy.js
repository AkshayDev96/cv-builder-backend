var LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { decode, genToken } = require('../helpers');
const userModel = require('../models/user')

passport.use(new LocalStrategy({passReqToCallback:true},
  function(req,username, password, done) {
    userModel.find({$or:[{email:username},{username:username}]})
    .then((userData)=>{
        if(userData?.length==0){
            done("No user found!",null)
        }else{
          let pass = decode(userData[0]?.password)
          let matched = password ==pass
          if(matched){
            done(null,{...userData[0]?._doc,token:genToken(userData[0])})
          }else{
            done("Not valid password",null) 
          }
        }
    }).catch((e)=>{
        done(e?.message,null)
    })
  }
));

passport.serializeUser((user,done)=>{
  console.log("user",user)
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})