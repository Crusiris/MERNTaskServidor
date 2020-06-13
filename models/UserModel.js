const mongoose = require('mongoose'); //Importando mongoose

mongoose.set('useCreateIndex', true)
    //Funcion para definir el modelo o estructura del usuario en la base de datos
const UsersSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        trim: true //Eliminar espacios en blanco
    },
    lastName: {
        type: String,
        require: true,
        trim: true //Eliminar espacios en blanco
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    registry: {
        type: Date,
        default: Date.now() //"now()" funcion que genera una fecha al instante
    }


});

module.exports = mongoose.model('User', UsersSchema); //('nombreModelo', UsersSchema);