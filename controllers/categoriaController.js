const Categoria = require('../models/categoriesModel.js'); // Asumiendo que tienes un modelo de Mongoose para Categorías

class CategoriaController {
    getCategorias() {
        return new Promise(async (resolve, reject) => {
            try {
                const categorias = await Categoria.find(); // Obtener todas las categorías de la base de datos
                if (categorias.length === 0) {
                    resolve({ status: 404, message: 'No se encontraron categorías' });
                } else {
                    resolve(categorias);
                }
            } catch (error) {
                console.error("Error al obtener categorías:", error);
                reject({ status: 500, error: 'Error al obtener las categorías' });
            }
        });
    }

    postCategoria(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newCategory = body;

                // Validar que todos los campos estén completos
                if (!newCategory.name) {
                    reject({ status: 400, error: 'El nombre de la categoría es obligatorio' });
                    return;
                }

                // Validar que no exista ya una categoría con el mismo nombre
                const categoryExists = await Categoria.findOne({ name: newCategory.name });
                if (categoryExists) {
                    reject({ status: 400, error: 'Ya existe una categoría con ese nombre' });
                    return;
                }

                // Guardar la nueva categoría en la base de datos
                const categoria = new Categoria(newCategory);
                await categoria.save();

                resolve({ status: 201, message: 'Categoría creada correctamente', categoria });
            } catch (error) {
                console.error("Error al crear la categoría:", error);
                reject({ status: 500, error: 'Error al crear la categoría' });
            }
        });
    }
}

module.exports = CategoriaController;