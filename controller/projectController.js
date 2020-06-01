const Project = require('../models/ProjectModel'); //importando el modelo

exports.createProject = async(req, res) => {
    try {
        //Creando proyecto
        const project = new Project(req.body);
        project.save(); //Guardando la nueva instancia proyecto en BD
        res.json(project);
    } catch (error) {
        console.log(error); //Imprimiendo el error en consola
        res.status(500).send('Hubo un error'); // Enviando un mensaje de error

    }
}