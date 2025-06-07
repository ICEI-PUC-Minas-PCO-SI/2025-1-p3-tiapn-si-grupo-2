const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');

// GET /equipamento/ todos e com filtros de pesquisa
router.get('/equipamentos', equipamentoController.buscarEquipamentos);

// POST /equipamento
router.post('/equipamentos', equipamentoController.criarEquipamento);

// PUT /equipamento/:id
router.put('/equipamentos/:id', equipamentoController.atualizarEquipamento);

// DELETE /equipamento/:id
router.delete('/equipamentos/:id', equipamentoController.buscarEquipamentos);


module.exports = router;