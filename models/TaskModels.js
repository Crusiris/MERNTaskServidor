const mongoose = require('mongoose'); //Importando mongoose
mongoose.set('useCreateIndex', true);

//Funcion para definir el modelo o estructura de la instancia TAREA, en la base de datos
const TasksSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true //Eliminar espacios en blanco
    },

    state: {
        type: Boolean,
        default: false
    },

    datecreate: {
        type: Date,
        default: Date.now() //"now()" funcion que genera una fecha al instante
    },

    projectcreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }

});

module.exports = mongoose.model('Task', ProjectsSchema); //('nombreModelo', UsersSchema);