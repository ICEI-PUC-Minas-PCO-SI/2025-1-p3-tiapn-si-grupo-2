const express = require('express');
const router = express.Router();
const ordemServicoController = require('../controllers/ordemServicoController');
const autenticarToken = require('../middlewares/authMiddleware');
// 👉 Criar Ordem de Serviço
router.post('/', ordemServicoController.criarOrdemServico);

// 👉 Buscar Ordens de Serviço (com filtros opcionais)
router.get('/', ordemServicoController.buscarOrdemServico);

// 👉 Atualizar Ordem de Serviço
router.put('/:idOrdemServico', ordemServicoController.atualizarOrdemServico);

// 👉 Deletar Ordem de Serviço
router.delete('/:idOrdemServico', ordemServicoController.deletarOrdemServico);

module.exports = router;
