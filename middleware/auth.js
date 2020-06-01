const jwt = require('jsonwebtoken');

//Verifincado si el usuario esta autenticado
module.exports = function(req, res, next) {
    //LEYENDO TOKEN
    const token = req.header('x-auth-token');

    //VERIFICAR SI EXISTE UN TOKEN
    if (!token) {
        res.status(401).json({ msg: 'No hay Token, permiso no valido' })
    }

    //VALIDAR TOKEN
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token invalido' })
    }
}