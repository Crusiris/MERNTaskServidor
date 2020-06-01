//Rutas para crear y eliminar un proyecto 
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const projectController = require('../controller/projectController'); //importando controlador de proyectos
const auth = require('../middleware/auth');

//Crea proyectos al hacer peticion POST al ENDPOIND "api/proyectos". LLamamos a la funcion que crea el proyecto qu esta en el controllador
router.post('/',
    auth,
    projectController.createProject
)

module.exports = router;