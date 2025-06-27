const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');
const autenticarToken = require('../middlewares/authMiddleware');
// GET /manutenção/ todos e com filtros de pesquisa
router.get('/', autenticarToken, manutencaoController.buscarManutencao);
router.get('/manutencoes-pendentes', autenticarToken, manutencaoController.listaManutencoesPendentes);
router.get('/manutencoes-por-mes', autenticarToken, manutencaoController.listaManutencoesPorMes);

// POST /manutenção
router.post('/', autenticarToken, manutencaoController.criarmanutencao);

// PUT /manutenção/:id
router.put('/:id', autenticarToken, manutencaoController.atualizarManutencao)

// DELETE /manutenção/:id
router.delete('/:id', autenticarToken, manutencaoController.deletarManutencao)

module.exports = router;
