const express = require('express'); //importando express
const conectDB = require('./config/db'); //importando config de mongodb
const cors = require('cors');
//Creando el servidor
const server = express();

//Conectando a la base de datos
conectDB();

//Habilitar cors para poder compartir informacion entre dominios diferentes
server.use(cors());

//Habilitando express.JSON
server.use(express.json({ extended: true }));

//Puerto de la app
const port = process.env.PORT || 4000;

//Importando rutas
server.use('/api/usuarios', require('./router/user')); //registro
server.use('/api/auth', require('./router/auth')); //autentificacion
server.use('/api/proyectos', require('./router/projects')); //proyectos
server.use('/api/tareas', require('./router/task')); //proyectos

//Corriendo la app
// server.listen(port, '0.0.0.0', () => {
//     console.log(`El servidor esta funcionando en el puerto ${port}`);
// })

server.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto aqui ${port}`);
})