const db = require('../db');


exports.criarOrdemServico = (req, res) => {
  const { Equipamento_idEquipamento, Servico_idServico } = req.body;

  if (!Equipamento_idEquipamento || !Servico_idServico) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Equipamento_idEquipamento', 'Servico_idServico']
    });
  }

  const sql = `INSERT INTO OrdemServico (Equipamento_idEquipamento, Servico_idServico) 
               VALUES (?, ?)`;

  db.getConnection().query(sql, [Equipamento_idEquipamento, Servico_idServico], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao criar Ordem de Serviço', detalhes: err.message });
    }

    res.status(201).json({
      sucesso: true,
      mensagem: 'Ordem de Serviço criada com sucesso',
      idOrdemServico: result.insertId,
      dados: { Equipamento_idEquipamento, Servico_idServico }
    });
  });
};


exports.atualizarOrdemServico = (req, res) => {
  const { idOrdemServico } = req.params;
  const { Equipamento_idEquipamento, Servico_idServico } = req.body;

  db.getConnection().query(`UPDATE OrdemServico 
            SET Equipamento_idEquipamento = ?, Servico_idServico = ? 
            WHERE idOrdemServico = ?`,
    [Equipamento_idEquipamento, Servico_idServico, idOrdemServico],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar Ordem de Serviço', detalhes: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Ordem de Serviço não encontrada' });
      }

      res.json({ sucesso: true, mensagem: 'Ordem de Serviço atualizada com sucesso' });
    });
};


exports.deletarOrdemServico = (req, res) => {
  const idOrdemServico = parseInt(req.params.idOrdemServico);
  if (!idOrdemServico) {
    return res.status(400).json({ erro: 'ID da Ordem de Serviço não fornecido' });
  }

  db.getConnection().query('DELETE FROM OrdemServico WHERE idOrdemServico = ?', [idOrdemServico], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao deletar Ordem de Serviço', detalhes: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Ordem de Serviço não encontrada' });
    }

    res.json({ sucesso: true, mensagem: 'Ordem de Serviço deletada com sucesso' });
  });
};


exports.buscarOrdemServico = (req, res) => {
  const { Equipamento_idEquipamento, Servico_idServico, idOrdemServico } = req.query;

  let sql = 'SELECT * FROM OrdemServico WHERE 1=1';
  const params = [];

  if (Equipamento_idEquipamento) {
    sql += ' AND Equipamento_idEquipamento = ?';
    params.push(Equipamento_idEquipamento);
  }
  if (Servico_idServico) {
    sql += ' AND Servico_idServico = ?';
    params.push(Servico_idServico);
  }
  if (idOrdemServico) {
    sql += ' AND idOrdemServico = ?';
    params.push(idOrdemServico);
  }

  db.getConnection().query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar Ordem de Serviço', detalhes: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Nenhuma Ordem de Serviço encontrada com os filtros informados' });
    }

    res.json({ sucesso: true, total: results.length, ordensServico: results });
  });
};
