const actRealizadaModel = require('../models/actRealizadaModel.js');
const categoriesModel = require('../models/categoriesModel.js');

exports.getActRealizadas = (req, res) => {
    //si esta vacio dar un mensaje que no hay 
    let allActR = actRealizadaModel.getActRealizadas();
    if (allActR.length === 0) {
        return res.status(400).send('No hay proyectos');
    } else {
        res.json(actRealizadaModel.getActRealizadas());    
    }
};

exports.postActividadRealizada = (req, res) => {
    let newAR = req.body;
    let allActR = actRealizadaModel.getActRealizadas();
    newAR.id = allActR.length + 1;

    let Exists = allActR.find(act => act.name === newAR.name);
    if (Exists) {
        return res.status(400).send('Ya existe una con ese nombre');
    }

    //antes de guardar validar que la idCategoria exista ya una categoria con ese id
    let allCategories = categoriesModel.getCategorias();
    let idCategoria = newAR.idCategoria
    //convertir categoria siempre en numero
    idCategoria = parseInt(idCategoria)
    let categoryExists = allCategories.find(category => category.id === idCategoria);
    if (!categoryExists) {
        return res.status(400).send('La categoría no existe debe crear una categoria primero');
    }

    //agregar status al crear en pendiente
    newAR.status = 'pending';
    
    actRealizadaModel.postActividadRealizada(newAR);
    res.json(newAR);
};

exports.getActividadesRealizadasPorFechas = (req, res) => {
    let startDate = req.query.desde;
    let endDate = req.query.hasta;

    console.log(startDate, endDate);
    const actividades = actRealizadaModel.getActividadesRealizadasPorFechas(startDate, endDate);
    if (!actividades) {
        res.status(404).json({ message: 'No se encontraron actividades realizadas en ese rango de fechas' });
        return;
    }
    res.json(actividades);
};
//http://localhost:3000/actividadRealizada/actividades-realizadas-por-fechas?desde='2025-02-08'&hasta='2025-02-11'



exports.getActividadesRealizadasPorNombreActividad = (req, res) => {
    let name = req.query.name;
    console.log("name que busca", name)
    const actividades = actRealizadaModel.getActividadesRealizadasPorNombreActividad(name);
    if (!actividades) {
        res.status(404).json({ message: 'No se encontraron actividades realizadas con ese nombre' });
        return;
    }
    res.json(actividades);
}

exports.getActividadesAbiertas = (req, res) => {
    const actividades = actRealizadaModel.getActividadesAbiertas();
    if (!actividades) {
        res.status(404).json({ message: 'No se encontraron actividades abiertas' });
        return;
    }
    res.json(actividades);
}

exports.deleteActividadRealizada = (req, res) => {
    let id = req.params.id;
    actRealizadaModel.deleteActividadRealizada(id);
    res.json({ message: 'Actividad realizada eliminada' });
}

exports.putActividadRealizada = (req, res) => {
    let id = req.params.id;
    //convertir el id en number
    id = parseInt(id)
    let newAR = req.body;
    actRealizadaModel.putActividadRealizada(id, newAR);
    res.json(newAR);
}