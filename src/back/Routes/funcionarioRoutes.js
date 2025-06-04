const express = require('express');
const router = express.Router();
const controller = require('../controllers/funcionarioController');

router.get('/', controller.getFuncionarios);
router.get('/:id', controller.getFuncionarioById);
router.post('/', controller.createFuncionario);
router.delete('/:id', controller.deleteFuncionario);

module.exports = router;
