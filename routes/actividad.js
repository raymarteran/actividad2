const express = require('express');
const router = express.Router();
const ActividadController = require('../controllers/actividadController.js');

const actividadController = new ActividadController();

router.get('/', (req, res, next) => {
    actividadController.getActividades(req.body)
    .then((result) => {
        console.log("result get Actividades", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

router.post('/', (req, res, next) => {
    actividadController.postActividad(req.body)
    .then((result) => {
        console.log("result post Actividad", result);  
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;