const db = require('../db');


exports.CriarServico = (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
    }

    
}