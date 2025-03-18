const Proyectos = require('../database/dataBase.js').Proyectos;
const Actividades = require('../database/dataBase.js').Actividades;
const actividadRealizada = require('../database/dataBase.js').ActRealizada;

const proyectoModel = {
    getProyectos: () => {
        return Proyectos.map(proyecto => {
            const actividades = Actividades.find(act => act.id === proyecto.idActividad);
            const actividadesRealizadas = actividadRealizada.filter(actR => actR.idActividad === actividades.id);

            return {
                ...proyecto,
                actividades: actividades ? { 
                    id: actividades.id, 
                    name: actividades.name,
                    actividadesRealizadas: actividadesRealizadas.map(actR => (actR))
                } : [],
            };
        });
    },
    postProyecto: (newpro) => {
        Proyecto.push(newpro);
        return newpro
    },
    getActividadesRealizadas: (idProyecto) => {
        const allProyectos = Proyectos.find(proy => proy.id === idProyecto);
        if (!allProyectos) {
            return [];
        }
        // de todos los proyectos traer las actividades y de las actividades las actividades realizadas
        const actividades = Actividades.find(act => act.id === allProyectos.idActividad);
        const actividadesRealizadas = actividadRealizada.filter(actR => actR.idActividad === actividades.id);

        return actividadesRealizadas
    },
    getTiempoUsado: () => {
        
        // de todos los proyectos traer las actividades y de las actividades las actividades realizadas
        const allProyec = Proyectos.map(proy => ({ ...proy, actividades: Actividades.find(act => act.id === proy.idActividad) }));
        const actividadesRealizadas = actividadRealizada.map(actR => ({ ...actR, actividades: Actividades.find(act => act.id === actR.idActividad) }));
        
        //calcular el tiempo de usado por cada actividad realizada comparando las fechas de inicio y final de la actividad realizada dateInicio y dateFinal si es el mismo dia debe dar el resultado tiempoUso: 1 dia
        actividadesRealizadas.forEach(actR => {
            actR.tiempoUso = Math.round((new Date(actR.dateFinal) - new Date(actR.dateInicio)) / (1000 * 60 * 60 * 24));
        });
        return actividadesRealizadas
    },
    //Eliminar proyecto y sus actividades realizadas.
    deleteProyecto: (idProyecto) => {
        const allProyectos = Proyectos.find(proy => proy.id === idProyecto);
        if (!allProyectos) {
            return [];
        }
        const actividades = Actividades.find(act => act.id === allProyectos.idActividad);
        const actividadesRealizadas = actividadRealizada.filter(actR => actR.idActividad === actividades.id);

        const index = Proyectos.indexOf(allProyectos);
        const indexActividades = Actividades.indexOf(actividades);
        const indexActividadesRealizadas = actividadRealizada.indexOf(actividadesRealizadas);

        Proyectos.splice(index, 1);
        Actividades.splice(indexActividades, 1);
        actividadRealizada.splice(indexActividadesRealizadas, 1);
    }
}   

module.exports = proyectoModel


// para guardar un nuevo proyecto:
/*
{
    "name": "nombredel proyecto",
    "idActividad": 1,
    "idActividadRealizada": 1
}
*/