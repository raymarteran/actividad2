const express = require('express');
const router = express.Router();
const Controller = require('../controllers/categoriaController.js');

router.get('/', Controller.getCategorias);
router.post('/', Controller.postCategoria);

module.exports = router;