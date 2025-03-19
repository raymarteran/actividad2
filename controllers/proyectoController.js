const proyectoModel = require('../models/proyectoModel.js');

const ProyectoModel = new proyectoModel();

class ProyectoController {
    getProyectos() {
        return new Promise((resolve, reject) => {
            try {
                const proyectos = ProyectoModel.getProyectos();
                if (proyectos.length === 0) {
                    reject({ status: 400, message: 'No hay proyectos' });
                } else {
                    resolve(proyectos);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    postProyecto(body) {
        return new Promise((resolve, reject) => {
            try {
                let newProyecto = body;
                let allProyectos = ProyectoModel.getProyectos();
                newProyecto.id = allProyectos.length + 1;

                // Validar si ya existe un proyecto con el mismo nombre
                let Exists = allProyectos.find(proy => proy.name === newProyecto.name);
                if (Exists) {
                    reject({ status: 400, message: 'Ya existe un proyecto con ese nombre' });
                    return;
                }

                // Guardar el nuevo proyecto
                ProyectoModel.postProyecto(newProyecto);
                resolve({ status: 201, message: 'Proyecto creado correctamente', proyecto: newProyecto });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear el proyecto' });
            }
        });
    }

    getActividadesRealizadas(idProyecto) {
        return new Promise((resolve, reject) => {
            try {
                idProyecto = parseInt(idProyecto);
                const actividades = ProyectoModel.getActividadesRealizadas(idProyecto);
                if (!actividades) {
                    reject({ status: 404, message: 'No se encontraron actividades realizadas por este proyecto' });
                } else {
                    resolve(actividades);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    getTiempoUsado() {
        return new Promise((resolve, reject) => {
            try {
                const tiempoUsado = ProyectoModel.getTiempoUsado();
                if (!tiempoUsado) {
                    reject({ status: 404, message: 'No se encontraron actividades realizadas por este proyecto' });
                } else {
                    resolve(tiempoUsado);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    deleteProyecto(id) {
        return new Promise((resolve, reject) => {
            try {
                id = parseInt(id);
                ProyectoModel.deleteProyecto(id);
                resolve({ status: 200, message: 'Proyecto eliminado correctamente' });
            } catch (error) {
                reject({ status: 500, error: 'Error al eliminar el proyecto' });
            }
        });
    }
}

module.exports = ProyectoController;