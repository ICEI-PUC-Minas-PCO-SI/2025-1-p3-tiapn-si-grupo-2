
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');
const autenticarToken = require('../middlewares/authMiddleware');
// GET /cliente
router.get('/', autenticarToken, clienteController.buscarClientes);

// GET /cliente/:id
router.get('/:id', autenticarToken, clienteController.buscarClientePorId);

// POST /cliente
router.post('/', autenticarToken, clienteController.criarCliente);

// PUT /cliente/:id
router.put('/:id', autenticarToken, clienteController.atualizarCliente);

// DELETE /cliente/:id
router.delete('/:id', autenticarToken, clienteController.deletarCliente);

module.exports = router;
