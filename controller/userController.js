const User = require('../models/UserModel'); //importando el modelo del usuario
const bcryptjs = require('bcryptjs'); //Importando libreria que hashea la contraseña
const { validationResult } = require('express-validator'); //importando el resultado de las validaciones
const jwt = require('jsonwebtoken');


//Registrando usuario
exports.createUser = async(req, res) => {
    console.log(req.body)
        //Revisando si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Si errores NO esta vacio entonces
        return res.status(400).json({ errores: errors.array() })
    }

    //Destructuring del req
    const { firstName, lastName, email, password } = req.body;

    try {

        let user = await User.findOne({ email })

        //Validando que el usuario/correo no exista
        if (user) {
            return res.status(400).json({ msg: 'El correo ya existe' });
        }

        //Creando una nueva instancia de user
        user = new User(req.body);

        //Hasheando el password
        const salt = await bcryptjs.genSalt(10); //Creando salt
        user.password = await bcryptjs.hash(password, salt); //hasheando y agregando el salt

        //guardar usuario
        await user.save();

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
            res.status(200).json({ token });

        })


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}