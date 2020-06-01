//Router para crear y eliminar una tarea 
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const taskController = require('../controller/taskController'); //importando controlador de proyectos
const auth = require('../middleware/auth');
const { check } = require('express-validator'); //Importando funcion de validación

//Crear tarea al hacer peticion POST al ENDPOIND "api/tareas". LLamamos a la funcion que crea la tarea que esta en el controllador
router.post('/',
    auth, [
        check('name', 'El nombre de la tarea es obligatorio').not().isEmpty() //Revisando que el campo no este vacio
    ],

    taskController.createTask
);

module.exports = router;