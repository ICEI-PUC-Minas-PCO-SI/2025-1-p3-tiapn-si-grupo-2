const express = require('express');
const router = express.Router();
const historicoAtividadesController = require('../controllers/historicoAtividadesController')

// GET /manutenção/ todos e com filtros de pesquisa
router.get('/', historicoAtividadesController.consultarHistoricoAtividades);

module.exports = router;
