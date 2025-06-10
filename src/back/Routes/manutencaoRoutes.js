const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

// GET /manutenção/ todos e com filtros de pesquisa
router.get('/', manutencaoController.buscarManutencao);

// POST /manutenção
router.post('/', manutencaoController.criarmanutencao);

// PUT /manutenção/:id
router.put('/:id', manutencaoController.atualizarManutencao)

// DELETE /manutenção/:id
router.delete('/:id', manutencaoController.deletarManutencao)

module.exports = router;
