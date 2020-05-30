const express = require('express'); //importando express
const conectDB = require('./config/db'); //importando config de mongodb

//Creando el servidor
const server = express();

//Conectando a la base de datos
conectDB();
//Puerto de la app
const PORT = process.env.PORT || 4000;


//Corriendo la app
server.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})