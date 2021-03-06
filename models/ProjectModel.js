const mongoose = require('mongoose'); //Importando mongoose

mongoose.set('useCreateIndex', true);
//Funcion para definir el modelo o estructura de PROYECTOS en la base de datos

const ProjectsSchema = mongoose.Schema({
    //Nombre del
    name: {
        type: String,
        require: true,
        trim: true //Eliminar espacios en blanco
    },
    //ID delUsuario que creo el proyecto 
    usercreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //fecha
    datecreate: {
        type: Date,
        default: Date.now() //"now()" funcion que genera una fecha al instante
    }

});

module.exports = mongoose.model('Project', ProjectsSchema); //('nombreModelo', UsersSchema);