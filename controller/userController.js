const User = require('../models/UserModel'); //importando el modelo del usuario

exports.createUser = async(req, res) => {
    try {
        let user;
        //Creando el nuevo usuario
        user = new User(req.body); //Creando una nueva instancia de user

        //guardar usuario
        await user.save();

        //Mensaje de confirmacio
        res.send('El usuario se a creado correctamente');

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}