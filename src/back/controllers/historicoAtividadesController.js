const db = require('../db');

exports.consultarHistoricoAtividades = (req, res) =>{
    const sql = "SELECT * from historicoatividades";
    db.query(sql, (err, results) =>{
        if (err) return res.status(500).json({ erro: 'Erro ao buscar funcionários', detalhes: err.message });
        return res.json({sucesso: true, total: results.length, historicoAtividades: results })
    })
}