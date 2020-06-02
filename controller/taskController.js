const Task = require('../models/TaskModels'); //importando el modelo
const Project = require('../models/ProjectModel'); //importando el modelo
const { validationResult } = require('express-validator'); //importando el resultado de las validaciones

//Creando tareas
exports.createTask = async(req, res) => {
    //Revisando si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Si errores NO esta vacio entonces
        return res.status(400).json({ errores: errors.array() });
    }


    try {

        const { projectcreate } = req.body;

        //Verificando que el proyecto exista
        const existproject = await Project.findById(projectcreate);


        if (!existproject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //Verificando si el proyecto actual pertenece al usuario activo
        if (existproject.usercreate.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        //Creando la tarea

        const task = new Task(req.body);
        await task.save(); //Guardando la nueva instancia tarea en BD
        res.json(task); //Respondiendo con json de tarea

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'); // Enviando un mensaje de error
    }
}

//Obtener tarea
exports.getTask = async(req, res) => {


    try {

        const { projectcreate } = req.body;

        //Verificando que el proyecto exista
        const existproject = await Project.findById(projectcreate);


        if (!existproject) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //Verificando si el proyecto actual pertenece al usuario activo
        if (existproject.usercreate.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        const tasks = await Task.find({ projectcreate }).sort({ datecreate: -1 });
        res.json({ tasks }); //Enviando la respuesta

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'); // Enviando un mensaje de error
    }
}