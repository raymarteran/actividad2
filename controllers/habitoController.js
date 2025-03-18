const habitoModel = require('../models/habitoModel.js');

exports.getHabitos = (req, res) => {
    res.json(habitoModel.getHabitos());
};

exports.postHabito = (req, res) => {
    let newHabito = req.body;
    let allHabitos = habitoModel.getHabitos();
    newHabito.id = allHabitos.length + 1;

    let Exists = allHabitos.find(hab => hab.name === newHabito.name);
    if (Exists) {
        return res.status(400).send('Ya existe una categoría con ese nombre');
    }

    
    habitoModel.postHabito(newHabito);
    res.json(newHabito);
};

exports.getHabitosNoActividadesRealizadas = (req, res) => {
    res.json(habitoModel.getHabitosNoActividadesRealizadas());
};