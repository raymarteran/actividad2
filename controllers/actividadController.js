const actividadModel = require('../models/actividadModel.js');

exports.getActividades = (req, res) => {
    res.json(actividadModel.getActividades());
};

exports.postActividad = (req, res) => {
    let newActivity = req.body;
    let allActividades = actividadModel.getActividades();
    newActivity.id = allActividades.length + 1;

    let Exists = allActividades.find(act => act.name === newActivity.name);
    if (Exists) {
        return res.status(400).send('Ya existe una categoría con ese nombre');
    }

    
    actividadModel.postActividad(newActivity);
    res.json(newActivity);
};