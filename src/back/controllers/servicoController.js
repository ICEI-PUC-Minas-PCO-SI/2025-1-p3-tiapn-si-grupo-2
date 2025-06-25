const db = require('../db');


exports.criarServico = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { tipoServico, dataInicio, dataFim, Status, Setor } = req.body;

  if (!tipoServico || !dataInicio || !Status || !Setor) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['tipoServico', 'dataInicio', 'Status', 'Setor']
    });
  }

  const sql = `INSERT INTO servico (tipoServico, dataInicio, dataFim, Status, Setor) 
               VALUES (?, ?, ?, ?, ?)`;

  db.getConnection().query(sql, [tipoServico, dataInicio, dataFim || null, Status, Setor], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    res.status(201).json({
      sucesso: true,
      mensagem: 'Serviço cadastrado com sucesso',
      idServico: result.insertId,
      dados: { tipoServico, Status, Setor }
    });
  });
};


exports.atualizarServico = (req, res) => {
  const { idServico } = req.params;
  const { tipoServico, dataInicio, dataFim, Status, Setor } = req.body;

  db.getConnection().query(`UPDATE servico 
            SET tipoServico = ?, dataInicio = ?, dataFim = ?, Status = ?, Setor = ? 
            WHERE idServico = ?`,
    [tipoServico, dataInicio, dataFim, Status, Setor, idServico],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar serviço', detalhes: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Serviço não encontrado' });
      }

      res.json({ sucesso: true, mensagem: 'Serviço atualizado com sucesso' });
    });
};


exports.deletarServico = (req, res) => {
  const idServico = parseInt(req.params.idServico);
  if (!idServico) {
    return res.status(400).json({ erro: 'ID do serviço não fornecido' });
  }

  db.getConnection().query('DELETE FROM servico WHERE idServico = ?', [idServico], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao deletar serviço', detalhes: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }

    res.json({ sucesso: true, mensagem: 'Serviço deletado com sucesso' });
  });
};


exports.buscarServicos = (req, res) => {
  const { tipoServico, dataInicio, dataFim, Status, Setor, idServico } = req.query;

  let sql = 'SELECT * FROM servico WHERE 1=1';
  const params = [];

  if (tipoServico) {
    sql += ' AND tipoServico LIKE ?';
    params.push(`%${tipoServico}%`);
  }
  if (dataInicio) {
    sql += ' AND dataInicio = ?';
    params.push(dataInicio);
  }
  if (dataFim) {
    sql += ' AND dataFim = ?';
    params.push(dataFim);
  }
  if (Status) {
    sql += ' AND Status LIKE ?';
    params.push(`%${Status}%`);
  }
  if (Setor) {
    sql += ' AND Setor LIKE ?';
    params.push(`%${Setor}%`);
  }
  if (idServico) {
    sql += ' AND idServico = ?';
    params.push(idServico);
  }

  db.getConnection().query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Nenhum serviço encontrado com os filtros informados' });
    }

    res.json({ sucesso: true, total: results.length, servicos: results });
  });
}
