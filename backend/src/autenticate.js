require("dotenv/config");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('./models/usuario');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "senha" }, // Campos usados para autenticação
      Usuario.authenticate()
    )
  );  
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, process.env.JWT_KEY, {expiresIn: '24h'});
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
 
exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    async function(jwt_payload, done) {
        try {
            const user = await Usuario.findOne({_id: jwt_payload._id});

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }

}));
exports.verifyUser = passport.authenticate('jwt', {session: false});