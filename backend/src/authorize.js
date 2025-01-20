
module.exports = function authorizeAdmin(req, res, next) {
    try {
        const isGerente = req.user.isGerente;

        if(!isGerente){
            throw new Error("É necessário ser administrador.")
        }
        return next()
        
    } catch (e) {
        console.error(e)
        res.status(500).json({ status: false, message: e.message });

    }
}
