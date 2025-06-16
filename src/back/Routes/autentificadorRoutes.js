const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Rota de login
router.post('/login', funcionarioController.loginFuncionario);

module.exports = router;
