const passport = require('passport');
const authenticate = require("../autenticate.js")

/**
 * @description Define as rotas de controle de autenticação
 * @param {*} router - Roteador do express
 */
module.exports = (router) =>{

    router.post('/login', (req, res, next) => {

        passport.authenticate('local', { session: false }, (err, user, info) => {

            try{

                if (err) {
                    throw new Error(err.message)
                }

                // Se o usuário não for encontrado ou as credenciais estiverem erradas
                if (!user) {
                    throw new Error(info.message || 'Invalid Credentials')
                }

                if(user.isGerente){
                    const {cpf, codigoSeguranca} = req.body;
                    if(!cpf || !codigoSeguranca){
                        throw new Error("Necessário verificação!")
                    }

                    if(user.cpf !== cpf || user.codigoSeguranca !== codigoSeguranca){
                        throw new Error('Invalid Credentials')

                    }
                }

                var token = authenticate.getToken({ _id: user._id });

                res
                    .setHeader('Content-Type', 'application/json')
                    .status(200)
                    .json({ status: true, token: token });

            } catch(e){
                res
                    .setHeader('Content-Type', 'application/json')
                    .status(401)
                    .json({ status: false, error: e.message });
            }

        })(req, res, next);  // Chama o Passport para realizar a autenticação
    });

};