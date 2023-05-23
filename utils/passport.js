const GoogleStrategy=require("passport-google-oauth20").Strategy;
const passport=require("passport");
const session=require("express-session")
const User=require("../models/userModel");

passport.use(new GoogleStrategy(
    {
      clientID:"860192770132-2cl4n6mu2l14v9s03jt5ghehvnambv1j.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL:"/auth/google/callback",
      scope:["profile","email"]
    },
    function(accessToken,refreshToken,profile,cb){
        console.log(profile);
        return cb(null,profile);
    }
))

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})