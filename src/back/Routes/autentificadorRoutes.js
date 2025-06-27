const express = require('express');
const router = express.Router();
const autentificadorController = require('../controllers/AutentificadorController');


router.post('/login', autentificadorController.loginFuncionario);

module.exports = router;
