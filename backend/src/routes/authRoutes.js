const passport = require('passport');
const authenticate = require("../autenticate.js")

/**
 * @description Define as rotas de controle de autenticação
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router.post('/login', (req, res, next) => {

        passport.authenticate('local', { session: false }, (err, user, info) => {

            if (err) {
                throw new Error(err.message)
            }

            // Se o usuário não for encontrado ou as credenciais estiverem erradas
            if (!user) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                return res.json({ 
                    status: false, 
                    error: info ? info.message : 'Invalid credentials'
                });
            }

            var token = authenticate.getToken({ _id: user._id });

            res
                .setHeader('Content-Type', 'application/json')
                .status(200)
                .json({ status: true, token: token });

        })(req, res, next);  // Chama o Passport para realizar a autenticação
    });

};