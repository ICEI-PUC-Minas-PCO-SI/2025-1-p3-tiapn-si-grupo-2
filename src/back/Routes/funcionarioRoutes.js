const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionarioController');
const funcionarioController = require('../controllers/funcionarioController');


// Listar funcionários (com filtros opcionais via query params)
router.get('/', controller.getFuncionarios);

// Buscar funcionário por ID
router.get('/:id', controller.getFuncionarioById);

// Criar novo funcionário
router.post('/', controller.createFuncionario);

// Atualizar funcionário por ID
router.put('/:id', controller.atualizarFuncionario);

// Deletar funcionário por ID
router.delete('/:id', controller.deleteFuncionario);

router.post('/login', funcionarioController.loginFuncionario);


module.exports = router;
