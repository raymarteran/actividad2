const express = require('express');
const router = express.Router();
const Controller = require('../controllers/actividadController.js');

router.get('/', Controller.getActividades);
router.post('/', Controller.postActividad);

module.exports = router;