const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');

// GET /equipamento/ todos e com filtros de pesquisa
router.get('/',equipamentoController.buscarProdutos);

// POST /equipamento
router.post('/', equipamentoController.criarequipamento);

// PUT /equipamento/:id
router.put('/:id',equipamentoController.atualizarProduto);

// DELETE /equipamento/:id
router.delete('/:id',equipamentoController.deletarproduto);


module.exports = router;
