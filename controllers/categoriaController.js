const categoriesModel = require('../models/categoriesModel');

exports.getCategorias = (req, res) => {
    res.json(categoriesModel.getCategorias());
};

exports.postCategoria = (req, res) => {
    let newCategory = req.body;
    let allCategories = categoriesModel.getCategorias();
    newCategory.id = allCategories.length + 1;

    //validar que no exista ya una categoria con el mismo name
    let categoryExists = allCategories.find(category => category.name === newCategory.name);
    if (categoryExists) {
        return res.status(400).send('Ya existe una categoría con ese nombre');
    }

    
    categoriesModel.postCategory(newCategory);
    res.json(newCategory);
};