const db = require('../db');

exports.criarmanutencao = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { equipamento_id, dataentrada, dataprazo, responsavel, status, Descricao, Observacoes } = req.body;

  if (!equipamento_id || !dataentrada || !responsavel) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Equipamento_idEquipamento', 'DataEntrada', 'ResponsavelManutencao']
    });
  }

  // 1. Verifica se o equipamento existe
  const sqlCheckEquipamento = 'SELECT idEquipamento FROM equipamento WHERE idEquipamento = ?';
  db.query(sqlCheckEquipamento, [equipamento_id], (err, equipamentoResults) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro no servidor (equipamento)', detalhes: err.message });
    }

    if (equipamentoResults.length === 0) {
      return res.status(400).json({ erro: `Equipamento com id ${equipamento_id} não encontrado` });
    }

    // 2. Verifica se o funcionário existe
    const sqlCheckFuncionario = 'SELECT idUsuario FROM funcionario WHERE idUsuario = ?';
    db.query(sqlCheckFuncionario, [responsavel], (err, funcionarioResults) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro no servidor (funcionário)', detalhes: err.message });
      }

      if (funcionarioResults.length === 0) {
        return res.status(400).json({ erro: `Funcionário com id ${responsavel} não encontrado` });
      }

      // 3. Insere no banco
      const sql = `INSERT INTO cadastromanutencao 
        (Equipamento_idEquipamento, DataEntrada, DataSaida, ResponsavelManutencao, Status, Descricao, Observacoes) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(sql,
        [equipamento_id, dataentrada, dataprazo || null, responsavel, status || null, Descricao || null, Observacoes || null],
        (err, result) => {
          if (err) {
            return res.status(500).json({ erro: 'Erro interno no servidor (inserção)', detalhes: err.message });
          }

          res.status(201).json({
            sucesso: true,
            mensagem: 'Manutenção cadastrada com sucesso',
            id: result.insertId,
            dados: {
              equipamento_id,
              dataentrada,
              dataprazo: dataprazo || null,
              responsavel,
              status: status || 'Não informado',
              Descricao: Descricao || 'Não informado',
              Observacoes: Observacoes || 'Nenhuma observação'
            }
          });
        }
      );
    });
  });
};

exports.atualizarManutencao = (req, res) => {
  const { id } = req.params;
  const {
    equipamento_id,
    dataentrada,
    datasaida,
    responsavel,
    status,
    Descricao,
    Observacoes
  } = req.body;

  const sql = `
    UPDATE cadastromanutencao 
    SET 
      DataEntrada = ?, 
      DataSaida = ?, 
      ResponsavelManutencao = ?, 
      Status = ?, 
      Descricao = ?, 
      Observacoes = ?, 
      Equipamento_idEquipamento = ?
    WHERE idManutencao = ?
  `;

  db.query(sql, [
    dataentrada,
    datasaida || null,
    responsavel,
    status || null,
    Descricao || null,
    Observacoes || null,
    equipamento_id,   // ✅ estava faltando antes!
    id
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao atualizar manutenção', detalhes: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Manutenção não encontrada' });
    }

    res.json({ sucesso: true, mensagem: 'Manutenção atualizada com sucesso' });
  });
};

exports.deletarManutencao = (req, res) => {
  const idManutencao = parseInt(req.params.id);
  if (!idManutencao) return res.status(400).json({ erro: 'ID da manutenção não fornecido' });

  db.query('DELETE FROM cadastromanutencao WHERE idManutencao = ?', [idManutencao], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar manutenção', detalhes: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'manutenção não encontrada' });

    res.json({ sucesso: true, mensagem: 'Manutenção deletada com sucesso' });
  });
};

exports.buscarManutencao = (req, res) => {
  const { equipamento_id, dataentrada, datasaida, responsavel, status } = req.query;

  let sql = 'SELECT * FROM cadastromanutencao WHERE 1=1';
  const params = [];

  if (equipamento_id) {
    sql += ' AND Equipamento_idEquipamento = ?';
    params.push(equipamento_id);
  }
  if (dataentrada) {
    sql += ' AND DataEntrada = ?';
    params.push(dataentrada);
  }
  if (datasaida) {
    sql += ' AND DataSaida = ?';
    params.push(datasaida);
  }
  if (responsavel) {
    sql += ' AND ResponsavelManutencao = ?';
    params.push(responsavel);
  }
  if (status) {
    sql += ' AND Status = ?';
    params.push(status);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Nenhuma manutenção encontrada com os filtros informados' });
    }

    res.json({ sucesso: true, total: results.length, equipamento: results });
  });
};

exports.listaManutencoesPendentes = (req, res) => {
  const params = [];
  const sql = 'select M.idManutencao, M.DataEntrada, M.status, E.Nome nomeEquipamento, F.Nome nomeFuncionario from cadastromanutencao M ' +
              'INNER JOIN FUNCIONARIO F ON (F.idUsuario = M.ResponsavelManutencao) ' +
              'INNER JOIN EQUIPAMENTO E ON (E.idEquipamento = M.Equipamento_idEquipamento) WHERE M.STATUS = "Pendente"';

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    res.json({ sucesso: true, total: results.length, manutencoes: results });
  })
}