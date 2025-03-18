const Habitos = require('../database/dataBase.js').Habitos;
const Actividades = require('../database/dataBase.js').Actividades;
const ActRealizada = require('../database/dataBase.js').ActRealizada;

const habitoModel = {
    getHabitos: () => {
        return Habitos.map(hab => {
            const actividades = Actividades ? Actividades.find(act => act.id === hab.idActividad) : [];
            return {
                ...hab,
                actividades: actividades ? actividades : []
            };
        });
    },
    postHabito: (habito) => {
        Habitos.push(habito);
        return habito
    },
    getHabitosNoActividadesRealizadas: () => {
        //de los habitos traer la infomacion de las Actividades y de las actividades las actividades realizadas
        const habitos = Habitos.map(hab => ({ ...hab, actividades: Actividades.filter(act => act.id === hab.idActividad) }));

        //agregar tambien por cada actividad las actividades realizadas
        const habitosActividadesRealizadas = habitos.map(hab => ({ ...hab, actividades: hab.actividades.map(act => ({ ...act, actividadesRealizadas: ActRealizada.filter(actR => actR.idActividad === act.id) })) }));

        //filtrar los habitos que no tienen actividades realizadas
        const habitosNoActividadesRealizadas = habitosActividadesRealizadas.filter(hab => !hab.actividades.some(act => act.actividadesRealizadas.length > 0));

        return habitosNoActividadesRealizadas
        
    }
}   

module.exports = habitoModel


// para guardar una nueva categoria:
/*
{
    "name": "Hábito 1",
    "idActividad": 1,
    "idUser": 1
}
*/