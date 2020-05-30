const User = require('../models/UserModel'); //importando el modelo del usuario
const bcryptjs = require('bcryptjs'); //Importando libreria que hashea la contraseña
const { validationResult } = require('express-validator'); //importando el resultado de las validaciones
const jwt = require('jsonwebtoken');

exports.authUser = async(req, res) => {

    //Revisando si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Si errores NO esta vacio entonces
        return res.status(400).json({ errores: errors.array() })
    }

    //Destructuring
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' })
        }

        //Verificando el password
        const passCorrect = await bcryptjs.compare(password, user.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'El password es incorrecto' })
        }

        //Si todo es correcto
        //Crear y firmar JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmacio
            res.status(400).json({ token });

        })

    } catch (error) {
        console.log(error);
    }
}