const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');
const autenticarToken = require('../middlewares/authMiddleware');
// GET /equipamento/ todos e com filtros de pesquisa
router.get('/', autenticarToken, equipamentoController.buscarEquipamentos);

// POST /equipamento
router.post('/', autenticarToken, equipamentoController.criarEquipamento);

// PUT /equipamento/:id
router.put('/:id', autenticarToken, equipamentoController.atualizarEquipamento);

// DELETE /equipamento/:id
router.delete('/:id', autenticarToken, equipamentoController.deletarEquipamento);


module.exports = router;
