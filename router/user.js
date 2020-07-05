//Rutas para crear usuario
const express = require('express'); //importando express
const router = express.Router(); //importamos la funcion Router de express
const userController = require('../controller/userController'); //importando controlador de usuarios
const { check } = require('express-validator'); //Importando funcion de validación

//Crea usuario al hacer peticion POST al ENDPOIND "api/usuarios"  
router.post('/',
    userController.createUser); //llamando al controlador que crea el usuario

module.exports = router;

// [
//     check('firstName', 'El nombre es obligatorio').not().isEmpty(), //Revisando que no este vacio el campo
//     check('lastName', 'El nombre es obligatorio').not().isEmpty(),
//     check('email', 'Agrega un email valido').isEmail(), //Revisando que sea un email
//     check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }) //Revisando que la contraseña tena minimo 6 caracteres
// ]