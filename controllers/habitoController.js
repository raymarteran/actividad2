const habitoModel = require('../models/habitoModel.js');

const HabitoModel = new habitoModel();

class HabitoController {
    getHabitos() {
        return new Promise((resolve, reject) => {
            try {
                const habitos = HabitoModel.getHabitos();
                resolve(habitos);
            } catch (error) {
                reject(error);
            }
        });
    }

    postHabito(body) {
        return new Promise((resolve, reject) => {
            try {
                let newHabito = body;
                let allHabitos = HabitoModel.getHabitos();
                newHabito.id = allHabitos.length + 1;

                // Validar si ya existe un hábito con el mismo nombre
                let Exists = allHabitos.find(hab => hab.name === newHabito.name);
                if (Exists) {
                    resolve({ status: 400, message: 'Ya existe un hábito con ese nombre' });
                    return;
                }

                // Guardar el nuevo hábito
                HabitoModel.postHabito(newHabito);
                resolve({ status: 201, message: 'Hábito creado correctamente', habito: newHabito });
            } catch (error) {
                reject({ status: 500, error: 'Error al crear el hábito' });
            }
        });
    }

    getHabitosNoActividadesRealizadas() {
        return new Promise((resolve, reject) => {
            try {
                const habitos = HabitoModel.getHabitosNoActividadesRealizadas();
                resolve(habitos);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = HabitoController;