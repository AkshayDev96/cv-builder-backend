var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require('../models/user')

const passport = require('passport');
const { genToken } = require('../helpers');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    let providerUserProfile = {
      profileId: profile?.id,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
      profilePic: profile?._json?.picture,
      email: profile?._json?.email,
      loginType: "google"
    };
   
    userModel.find({ profileId: profile?.id }).then(async (data) => {
      if (data?.length == 0) {
        //No user data
        const userObj = new userModel(providerUserProfile)
        const newData = await userObj.save()
        return done(null, {...newData,token:genToken(newData)});
      } else {
        //user already exists!
        return done(null, {...data[0]?._doc,token:genToken(data)});
      }
    }).catch((e)=>{
      return done(e?.message, null);
    })

  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email'],
  enableProof: true
},
  function (accessToken, refreshToken, profile, done) {
    let providerUserProfile = {
      profileId: profile?.id,
      firstName: profile?.name?.givenName,
      lastName: profile?.name?.familyName,
      profilePic: profile?._json?.picture,
      email: profile?._json?.email,
      loginType: "facebook"
    };
   
    userModel.find({ profileId: profile?.id }).then(async (data) => {
      if (data?.length == 0) {
        //No user data
        const userObj = new userModel(providerUserProfile)
        const newData = await userObj.save()
        return done(null, {...newData,token:genToken(newData)});
      } else {
        //user already exists!
        return done(null, {...data[0]?._doc,token:genToken(data)});
      }
    }).catch((e)=>{
      return done(e?.message, null);
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})