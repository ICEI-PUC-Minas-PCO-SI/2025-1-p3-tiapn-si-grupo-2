const db = require('../db');

exports.criarEquipamento = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao,
    Observacoes, Cliente_idCliente } = req.body;

  if (!Nome || !Tipo || !Marca || !SerialNumber || !Cliente_idCliente) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Nome', 'Tipo', 'Marca', 'SerialNumber', 'Cliente_idCliente']
    });
  }

  const sql = `INSERT INTO equipamento 
    (Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao, Observacoes, Cliente_idCliente) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
  const atividade = `Novo cadastro de equipamento: ${Nome}`;
  const tabelaAfetada = "Equipamento";
  const dataRegistro = new Date();

  db.query(sql,
    [Nome, Tipo, Marca || null, SerialNumber, Status, DataEntrada, DataSaida, Descricao || null,
      Observacoes || null, Cliente_idCliente],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
      }

      res.status(201).json({
        sucesso: true,
        mensagem: 'Equipamento cadatrado com sucesso',
        id: result.insertId,
        dados: { Nome, Tipo: Tipo || 'Não informado' }
      });

      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })
    });
};

exports.atualizarEquipamento = (req, res) => {
  const { id } = req.params;
  const { Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao,
    Observacoes, Cliente_idCliente } = req.body;

  const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
  const atividade = `Atualização do equipamento: ${Nome}`;
  const tabelaAfetada = "Equipamento";
  const dataRegistro = new Date();

  db.query("UPDATE equipamento SET Nome = ?, Tipo = ?, Marca = ?, SerialNumber = ?, Status = ?, DataEntrada = ?, DataSaida = ?, Descricao = ?, Observacoes = ?,Cliente_idCliente = ? WHERE idEquipamento = ?",
    [Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao, Observacoes, Cliente_idCliente, id],
    (err, result) => {
      console.log(err);

      if (err) return res.status(500).json({ erro: 'Erro ao atualizar equipamento', detalhes: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Equipamento não encontrado' });
      }

      res.json({ sucesso: true, mensagem: 'Equipamento atualizado com sucesso' });

      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })
    });
};

exports.deletarEquipamento = (req, res) => {
  const idEquipamento = parseInt(req.params.id);
  if (!idEquipamento) return res.status(400).json({ erro: 'ID do Equipamento não fornecido' });
  console.log(idEquipamento);

  db.query("SELECT Nome from equipamento where idEquipamento = ?", [idEquipamento], (err, results) => {
    if (err) {
      return console.log(err)
    }
    const nomeEquipamento = results[0].Nome;
    const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
    const atividade = `Equipamento deletado: ${nomeEquipamento}`;
    const tabelaAfetada = "Equipamento";
    const dataRegistro = new Date();

    db.query('DELETE FROM equipamento WHERE idEquipamento = ?', [idEquipamento], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao deletar Equipamento', detalhes: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ erro: 'Equipamento não encontrado' });

      res.json({ sucesso: true, mensagem: 'Equipamento deletado com sucesso' });
      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })
    });
  })


};

exports.buscarEquipamentos = (req, res) => {
  const { nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Cliente_idCliente, id } = req.query;

  let sql = 'SELECT equipamento.*, cliente.Nome cliente FROM equipamento INNER JOIN cliente on (cliente.idCliente = equipamento.Cliente_idCliente) WHERE 1=1';
  const params = [];

  if (nome) {
    sql += ' AND Nome LIKE ?';
    params.push(`%${nome}%`);
  }
  if (Tipo) {
    sql += ' AND Tipo LIKE ?';
    params.push(`%${Tipo}%`);
  }
  if (Marca) {
    sql += ' AND Marca LIKE ?';
    params.push(`%${Marca}%`);
  }
  if (SerialNumber) {
    sql += ' AND SerialNumber LIKE ?';
    params.push(`%${SerialNumber}%`);
  }
  if (Status) {
    sql += ' AND Status = ?';
    params.push(Status);
  }
  if (DataEntrada) {
    sql += ' AND DataEntrada = ?';
    params.push(DataEntrada);
  }
  if (DataSaida) {
    sql += ' AND DataSaida = ?';
    params.push(DataSaida);
  }
  if (Cliente_idCliente) {
    sql += ' AND Cliente_idCliente = ?';
    params.push(Cliente_idCliente);
  }
  if (id) {
    sql += ' AND idEquipamento = ?';
    params.push(id);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Nenhum equipamento encontrado com os filtros informados' });
    }

    res.json({ sucesso: true, total: results.length, equipamento: results });
  });
};
