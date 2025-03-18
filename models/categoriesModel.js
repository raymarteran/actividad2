const Categorias = require('../database/dataBase.js').Categorias;

const categoriesModel = {
    getCategorias: () => Categorias,
    postCategory: (category) => {
        Categorias.push(category);
        return category
    }
}   

module.exports = categoriesModel


// para guardar una nueva categoria:
/*
{
    "name": "nombre de categoria nuevo"
}
*/