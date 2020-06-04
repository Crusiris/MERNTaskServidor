const express = require('express'); //importando express
const conectDB = require('./config/db'); //importando config de mongodb
const cors = require('cors');
//Creando el servidor
const server = express();

//Conectando a la base de datos
conectDB();

//Habilitar cors
server.use(cors());

//Habilitando express.JSON
server.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importando rutas
server.use('/api/usuarios', require('./router/user')); //registro
server.use('/api/auth', require('./router/auth')); //autentificacion
server.use('/api/proyectos', require('./router/projects')); //proyectos
server.use('/api/tareas', require('./router/task')); //proyectos

//Corriendo la app
server.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})