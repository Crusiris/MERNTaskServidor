//Rutas para crear usuario
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const authController = require('../controller/authController'); //importando controlador de auth
const { check } = require('express-validator'); //Importando funcion de validación
const auth = require('../middleware/auth');

//autentificar [INICIAR SESION] usuario al hacer peticion POST al ENDPOIND 
//"api/auth"  
router.post('/',
    authController.authUser); //llamando al controlador que autentifica el usuario

//Obteniendo al usuario que INICIAR SESION al hacer peticion GET al ENDPOIND 
//"api/auth"  
router.get('/',
    auth,
    authController.userAuth
);
module.exports = router;