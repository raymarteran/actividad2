const actividadModel = require('../models/actividadModel.js');

const ActividadModel = new actividadModel();

class ActividadController {
    getActividades() {
        return new Promise((resolve, reject) => {
            try {
                const actividades = ActividadModel.getActividades();
                resolve(actividades);
            } catch (error) {
                reject(error);
            }
        });
    }

    postActividad(body) {
        return new Promise((resolve, reject) => {
            try {
                let newActivity = body;
                let allActividades = ActividadModel.getActividades();
                newActivity.id = allActividades.length + 1;

                // Validar que no exista ya una actividad con el mismo nombre
                let Exists = allActividades.find(act => act.name === newActivity.name);
                if (Exists) {
                    reject({ status: 400, message: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                // Guardar la nueva actividad
                ActividadModel.postActividad(newActivity);
                resolve({ status: 201, message: 'Actividad creada correctamente', actividad: newActivity });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear la actividad' });
            }
        });
    }
}

module.exports = ActividadController;