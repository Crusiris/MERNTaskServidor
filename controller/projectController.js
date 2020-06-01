const Project = require('../models/ProjectModel'); //importando el modelo
const { validationResult } = require('express-validator'); //importando el resultado de las validaciones

exports.createProject = async(req, res) => {

    //Revisando si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Si errores NO esta vacio entonces
        return res.status(400).json({ errores: errors.array() })
    }

    try {
        //Creando proyecto
        const project = new Project(req.body);

        //Guardando el creador via jwt
        project.usercreate = req.user.id;
        project.save(); //Guardando la nueva instancia proyecto en BD
        res.json(project);
    } catch (error) {
        console.log(error); //Imprimiendo el error en consola
        res.status(500).send('Hubo un error'); // Enviando un mensaje de error

    }
}

//Obteniendo proyectos segun el usuario que este activo

exports.getProjects = async(req, res) => {

    try {
        const project = await Project.find({ usercreate: req.user.id }).sort({ datecreate: -1 });
        res.json({ project }); //Enviando la respuesta
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

//Actualizar un proyecto
exports.updateProject = async(req, res) => {
    //Revisando si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //Si errores NO esta vacio entonces
        return res.status(400).json({ errores: errors.array() })
    }

    //Extrayendo la informacion del proyecto
    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        //Verificando ID
        let project = await Project.findById(req.params.id)

        //Verificar que el proyecto exista
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' })
        }

        //Verificar al creador del proyecto
        if (project.usercreate.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        //Actualizar proyecto
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor')
    }
}