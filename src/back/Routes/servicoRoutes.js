const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicoController');

// 👉 Criar Serviço
router.post('/', servicoController.criarServico);

// 👉 Buscar Serviços (com filtros opcionais)
router.get('/', servicoController.buscarServicos);

// 👉 Atualizar Serviço
router.put('/:idServico', servicoController.atualizarServico);

// 👉 Deletar Serviço
router.delete('/:idServico', servicoController.deletarServico);

module.exports = router;
