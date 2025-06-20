
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

// GET /cliente
router.get('/', clienteController.buscarClientes);

// GET /cliente/:id
router.get('/:id', clienteController.buscarClientePorId);

// POST /cliente
router.post('/', clienteController.criarCliente);

// PUT /cliente/:id
router.put('/:id', clienteController.atualizarCliente);

// DELETE /cliente/:id
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;
