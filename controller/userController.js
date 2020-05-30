const User = require('../models/UserModel'); //importando el modelo del usuario
const bcryptjs = require('bcryptjs');

exports.createUser = async(req, res) => {

    //Destructuring del req
    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email })

        //Validando que el usuario/correo no exista
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        //Creando una nueva instancia de user
        user = new User(req.body);

        //Hasheando el password
        const salt = await bcryptjs.genSalt(10); //Creando salt
        user.password = await bcryptjs.hash(password, salt); //hasheando y agregando el salt

        //guardar usuario
        await user.save();

        //Mensaje de confirmacio
        res.status(400).json({ msg: 'El usuario fue creado correctamente' });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}