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
        //Revisando que el campo no este vacio
    ],

    taskController.createTask
);

//Obtener tareas //ENDPOIND "api/tareas/idProject"
router.get('/',
    auth,
    taskController.getTask
);

//Actualizar tarea  //ENDPOIND "api/tareas/id"
router.put('/:id',
    auth,
    taskController.updateTask
);

//Eliminar tarea
router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;