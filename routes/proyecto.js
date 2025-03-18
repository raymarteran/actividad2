const express = require('express');
const router = express.Router();
const Controller = require('../controllers/proyectoController.js');

router.get('/', Controller.getProyectos);
router.get('/actividades-realizadas/:id', Controller.getActividadesRealizadas);
router.post('/', Controller.postProyecto);
//tiempo usado por proyecto
router.get('/tiempo-usado', Controller.getTiempoUsado);
//Eliminar proyecto y sus actividades realizadas.
router.delete('/:id', Controller.deleteProyecto);

module.exports = router;