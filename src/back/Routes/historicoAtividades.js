const express = require('express');
const router = express.Router();
const historicoAtividadesController = require('../controllers/historicoAtividadesController')
const autenticarToken = require('../middlewares/authMiddleware');
// GET /manutenção/ todos e com filtros de pesquisa
router.get('/', autenticarToken, historicoAtividadesController.consultarHistoricoAtividades);

module.exports = router;
