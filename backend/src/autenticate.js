const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/usuario');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/********
 *            secretKey ??
 *          
 *          verifyUser é o middleware        
 * 
*********/
exports.getToken = function(user) {
    return jwt.sign(user, secretKey, {expiresIn: 3600});
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
 
exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    function(jwt_payload, done) {
        console.log("JWT payload: ", jwt_payload)
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
}));
exports.verifyUser = passport.authenticate('jwt', {session: false});