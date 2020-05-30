const express = require('express'); //importando express
const conectDB = require('./config/db'); //importando config de mongodb

//Creando el servidor
const server = express();

//Conectando a la base de datos
conectDB();

//Habilitando express.JSON
server.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importando rutas
server.use('/api/usuarios', require('./router/user'));


//Corriendo la app
server.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})