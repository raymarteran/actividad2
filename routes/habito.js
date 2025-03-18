const express = require('express');
const router = express.Router();
const Controller = require('../controllers/habitoController.js');

router.get('/', Controller.getHabitos);
router.post('/', Controller.postHabito);
//mostrar los habitos que no tiene actividades realizadas
router.get('/habitos-no-actividades-realizadas', Controller.getHabitosNoActividadesRealizadas);

module.exports = router;