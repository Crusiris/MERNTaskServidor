//Rutas para crear usuario
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const authController = require('../controller/authController'); //importando controlador de auth
const { check } = require('express-validator'); //Importando funcion de validación
const auth = require('../middleware/auth');
//autentificar [INICIAR SESION] usuario al hacer peticion POST al ENDPOIND 
//"api/auth"  
router.post('/', [
        check('email', 'Agrega un email valido').isEmail(), //Revisando que sea un email
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }) //Revisando que la contraseña tenga minimo 6 caracteres
    ],
    authController.authUser); //llamando al controlador que autentifica el usuario


router.get('/',
    auth,
    authController.userAuth
);
module.exports = router;