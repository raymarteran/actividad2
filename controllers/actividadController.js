const Actividad = require('../models/actividadModel.js'); // Asumiendo que tienes un modelo de Mongoose para Actividades

class ActividadController {
    getActividades() {
        return new Promise(async (resolve, reject) => {
            try {
                const actividades = await Actividad.find(); // Obtener todas las actividades de la base de datos
                if (actividades.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron actividades' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                console.error("Error al obtener actividades:", error);
                reject({ status: 500, error: 'Error al obtener las actividades' });
            }
        });
    }

    postActividad(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newActivity = body;

                // Validar que todos los campos estén completos
                if (!newActivity.name || !newActivity.idCategoria || !newActivity.idUser) {
                    reject({ status: 400, error: 'Todos los campos son obligatorios' });
                    return;
                }

                // Validar que no exista ya una actividad con el mismo nombre
                const exists = await Actividad.findOne({ name: newActivity.name });
                if (exists) {
                    reject({ status: 400, error: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                // Guardar la nueva actividad en la base de datos
                const actividad = new Actividad(newActivity);
                await actividad.save();

                resolve({ status: 201, message: 'Actividad creada correctamente', actividad });
            } catch (error) {
                console.error("Error al crear la actividad:", error);
                reject({ status: 500, error: 'Error al crear la actividad' });
            }
        });
    }
}

module.exports = ActividadController;