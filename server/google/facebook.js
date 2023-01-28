import { app } from "firebase-admin";
import * as passport from "passport";
import { Strategy } from "passport-facebook";
app.use(passport.initialize());
app.use(passport.session())
passport.serializeUser(function (user, cb) {
    cb(null, user);  
})
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
})
passport.use(new Strategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "",
    profileFields: ['id',"displayName"],
    
},
function (accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);

    const user = {};
    done(null, user);
    }))
app.use('/login/fb', passport.authenticate('facebook'))
app.use('/failed/login', (req, res, next) => {
    res.send('login failed')
})
app.use('/fb/auth', passport.authenticate('facebook', { failedRedirect: '/failed/login' }, (req, res, next) => {
    console.log(req.user,req.isAuthenticated())
    res.send("logged in to facebook")
}))