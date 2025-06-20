const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

const autenticarToken = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

// 🔐 Protege quem pode criar funcionários
router.post('/', autenticarToken, verificarAdmin, funcionarioController.createFuncionario);

// 🔐 Apenas admin pode atualizar e deletar
router.put('/:id', autenticarToken, verificarAdmin, funcionarioController.atualizarFuncionario);
router.delete('/:id', autenticarToken, verificarAdmin, funcionarioController.deleteFuncionario);

// 🔓 Rotas abertas para qualquer usuário autenticado
router.get('/', autenticarToken, funcionarioController.getFuncionarios);
router.get('/:id', autenticarToken, funcionarioController.getFuncionarioById);

module.exports = router;
