const ActRealizada = require('../database/dataBase.js').ActRealizada;

const actRealizadaModel = {
    getActRealizadas: () => ActRealizada,
    postActividadRealizada: (newAR) => {
        ActRealizada.push(newAR);
        return newAR
    },
    getActividadesRealizadasPorFechas: (startDate, endDate) => {
        const actividades = ActRealizada.filter(act => new Date(act.dateInicio) > new Date(startDate) && new Date(act.dateFinal) < new Date(endDate));
        return actividades
    },
    getActividadesRealizadasPorNombreActividad: (name) => {
        const actividadesRealizadas = ActRealizada.filter(act => act.name === name)
        return actividadesRealizadas
    },
    getActividadesAbiertas: () => {
        const actividadesAbiertas = ActRealizada.filter(act => act.dateFinal === null);
        return actividadesAbiertas
    },
    deleteActividadRealizada: (id) => {
        const index = ActRealizada.findIndex(act => act.id === id);
        ActRealizada.splice(index, 1);
    },
    putActividadRealizada: (id, newAR) => {
        const index = ActRealizada.findIndex(act => act.id === id);
        ActRealizada[index] = newAR;
    }
}   

module.exports = actRealizadaModel


// para guardar un nueva actividad realizada:
/*
{
    "name": "Actividad1",
    "description": "Actividad 1descripcion",
    "idActividad": 1,
    "dateInicio": "2025-02-03",
    "dateFinal": "2025-02-04",
    "status": "pending"
}
*/


///para hacer put de una actividad realizada
/*
{
    "name": "Actividad7",
    "description": "Actividad 7descripcion",
    "idActividad": 7,
    "dateInicio": "2025-02-03",
    "dateFinal": "2025-02-04",
    "status": "pending"
}
*/