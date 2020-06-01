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