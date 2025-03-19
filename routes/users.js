const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController.js');

const usersController = new UsersController();


router.get('/', (req, res, next)=>{
    usersController.getUsers(req.body)
    .then((result) => {
        console.log("result get Users", result);  
        res.send(result);
    })
});
router.post('/', (req, res, next)=>{
    usersController.postUser(req.body)
    .then((result) => {
        console.log("result post", result);  
        res.send(result);
    })
});

router.get('/actividades-categoria-usuario/:id/:categoria', (req, res, next) => {
    usersController.getActividadesCategoriaUsuario(req.params.id, req.params.categoria)
    .then((result) => {
        console.log("resultado de usario por categoria", result);
        res.send(result);
    })
});

router.get('/last-actividadesrealizadas/:id', (req, res, next) => {
    usersController.getLastActividadesRealizadas(req.params.id)
    .then((result) => {
        console.log("resultado de usario por categoria", result);
        res.send(result);
    })
});


module.exports = router;