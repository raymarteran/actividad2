const actRealizadaModel = require('../models/actRealizadaModel.js');
const categoriesModel = require('../models/categoriesModel.js');

const ActRealizadaModel = new actRealizadaModel();
const CategoriesModel = new categoriesModel();

class ActividadRealizadaController {
    getActRealizadas() {
        return new Promise((resolve, reject) => {
            try {
                const allActR = ActRealizadaModel.getActRealizadas();
                if (allActR.length === 0) {
                    reject({ status: 400, message: 'No hay actividades realizadas' });
                } else {
                    resolve(allActR);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    postActividadRealizada(body) {
        return new Promise((resolve, reject) => {
            try {
                let newAR = body;
                let allActR = ActRealizadaModel.getActRealizadas();
                newAR.id = allActR.length + 1;

                // Validar que no exista ya una actividad con el mismo nombre
                let Exists = allActR.find(act => act.name === newAR.name);
                if (Exists) {
                    reject({ status: 400, message: 'Ya existe una actividad con ese nombre' });
                    return;
                }

                // Validar que la categoría exista
                let allCategories = CategoriesModel.getCategorias();
                let idCategoria = parseInt(newAR.idCategoria);
                let categoryExists = allCategories.find(category => category.id === idCategoria);
                if (!categoryExists) {
                    reject({ status: 400, message: 'La categoría no existe, debe crear una categoría primero' });
                    return;
                }

                // Agregar status al crear en pendiente
                newAR.status = 'pending';

                // Guardar la nueva actividad realizada
                ActRealizadaModel.postActividadRealizada(newAR);
                resolve({ status: 201, message: 'Actividad realizada creada correctamente', actividad: newAR });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear la actividad realizada' });
            }
        });
    }

    getActividadesRealizadasPorFechas(desde, hasta) {
        return new Promise((resolve, reject) => {
            try {
                const actividades = ActRealizadaModel.getActividadesRealizadasPorFechas(desde, hasta);
                if (!actividades) {
                    reject({ status: 404, message: 'No se encontraron actividades realizadas en ese rango de fechas' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesRealizadasPorNombreActividad(name) {
        return new Promise((resolve, reject) => {
            try {
                const actividades = ActRealizadaModel.getActividadesRealizadasPorNombreActividad(name);
                if (!actividades) {
                    reject({ status: 404, message: 'No se encontraron actividades realizadas con ese nombre' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    getActividadesAbiertas() {
        return new Promise((resolve, reject) => {
            try {
                const actividades = ActRealizadaModel.getActividadesAbiertas();
                if (!actividades) {
                    reject({ status: 404, message: 'No se encontraron actividades abiertas' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteActividadRealizada(id) {
        return new Promise((resolve, reject) => {
            try {
                ActRealizadaModel.deleteActividadRealizada(id);
                resolve({ status: 200, message: 'Actividad realizada eliminada correctamente' });
            } catch (error) {
                reject({ status: 500, error: 'Error al eliminar la actividad realizada' });
            }
        });
    }

    putActividadRealizada(id, body) {
        return new Promise((resolve, reject) => {
            try {
                id = parseInt(id);
                const updatedActividad = ActRealizadaModel.putActividadRealizada(id, body);
                resolve({ status: 200, message: 'Actividad realizada actualizada correctamente', actividad: updatedActividad });
            } catch (error) {
                reject({ status: 500, error: 'Error al actualizar la actividad realizada' });
            }
        });
    }
}

module.exports = ActividadRealizadaController;