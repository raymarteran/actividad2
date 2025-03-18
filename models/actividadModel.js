const Actividades = require('../database/dataBase.js').Actividades;
const Categorias = require('../database/dataBase.js').Categorias;
const actividadModel = {
    getActividades: () => {
        return Actividades.map(actividad => {
            const categoria = Categorias.find(cat => cat.id === actividad.idCategoria);
            return {
                ...actividad,
                categoria: categoria ? { id: categoria.id, name: categoria.name } : []
            };
        });
    },
    postActividad: (actividad) => {
        Actividades.push(actividad);
        return actividad
    }
}   

module.exports = actividadModel


// para guardar una nueva categoria:
/*
{
    "name": "Actividad 1",
    "idCategoria": 2,
    "idUser": 1
}
*/