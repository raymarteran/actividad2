const categoriesModel = require('../models/categoriesModel.js');

const CategoriesModel = new categoriesModel();

class CategoriaController {
    getCategorias() {
        return new Promise((resolve, reject) => {
            try {
                const categorias = CategoriesModel.getCategorias();
                resolve(categorias);
            } catch (error) {
                reject(error);
            }
        });
    }

    async postCategoria(body) {
        try {
            console.log('body', body);
            let newCategory = body;
    
            // Esperar a que la promesa se resuelva
            let allCategories = await CategoriesModel.getCategorias();
    
            // Asegurarse de que allCategories sea un array
            if (!Array.isArray(allCategories)) {
                console.log('allCategories no es un array, inicializando como array vacío');
                allCategories = [];
            }
    
            newCategory.id = allCategories.length + 1;
    
            console.log('allCategories', allCategories);
    
            // Validar que no exista ya una categoría con el mismo nombre
            let categoryExists = allCategories.find(category => category.name === newCategory.name);
            console.log('categoryExists', categoryExists);
            if (categoryExists) {
                console.log('Ya existe una categoría con ese nombre');
                return { status: 400, message: 'Ya existe una categoría con ese nombre' };
            } else {
                console.log('No existe una categoría con ese nombre');
            }
    
            console.log('Categoría crear', newCategory);
    
            // Guardar la nueva categoría
            CategoriesModel.postCategory(newCategory);
            return { status: 201, message: 'Categoría creada correctamente', categoria: newCategory };
        } catch (error) {
            console.log('Error al crear la categoría', error);
            return { status: 500, error: 'Error al crear la categoría' };
        }
    }
}

module.exports = CategoriaController;