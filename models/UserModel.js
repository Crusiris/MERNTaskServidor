const mongoose = require('mongoose'); //Importando mongoose

//Funcion para definir el modelo o estructura de la base de datos
const UsersSchema = mongoose.Schema({

    name: {
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