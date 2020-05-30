//Rutas para crear usuario
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const userController = require('../controller/userController'); //importando controlador de usuarios

//Crea usuario al hacer peticion POST al ENDPOIND "api/usuarios"  
router.post('/', userController.createUser);

module.exports = router;