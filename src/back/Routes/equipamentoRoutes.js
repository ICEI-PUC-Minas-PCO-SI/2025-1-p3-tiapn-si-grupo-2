const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');

// GET /equipamento/ todos e com filtros de pesquisa
router.get('/', equipamentoController.buscarEquipamentos);

// POST /equipamento
router.post('/', equipamentoController.criarEquipamento);

// PUT /equipamento/:id
router.put('/:id', equipamentoController.atualizarEquipamento);

// DELETE /equipamento/:id
router.delete('/:id', equipamentoController.deletarEquipamento);


module.exports = router;
