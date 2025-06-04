const db = require('../db');

exports.criarequipamento = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const {idEquipamento,Nome,Tipo,Marca,SerialNumber,Status,DataEntrada,DataSaida,Descricao,
  Observacoes,Clienteid} = req.body;

  if (!Nome || !Tipo || !Marca || !SerialNumber || !Clienteid) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Nome', 'Tipo', 'Marca', 'SerialNumber', 'Cliente_idCliente']
    });
  }

  const sql = `INSERT INTO equipamento 
    (Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao, Observacoes,Cliente_idCliente) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql,
    [Nome,Tipo,Marca || null,SerialNumber,Status,DataEntrada,DataSaida,Descricao || null,
  Observacoes || null ,Clienteid],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
      }

      res.status(201).json({
        sucesso: true,
        mensagem: 'Produto cadatrado com sucesso',
        id: result.insertId,
        dados: { Nome, Tipo: Tipo || 'Não informado' }
      });
    });
};

exports.atualizarProduto = (req, res) => {
  const { id } = req.params;
  const {Nome,Tipo,Marca,SerialNumber,Status,DataEntrada,DataSaida,Descricao,
  Observacoes,Clienteid} = req.body;

  db.query("UPDATE equipamento SET Nome = ?, Tipo = ?, Marca = ?, SerialNumber = ?, Status = ?, DataEntrada = ?, DataSaida = ?, Descricao = ?, Observacoes = ?,Cliente_idCliente = ? WHERE idEquipamento = ?",
    [Nome,Tipo,Marca,SerialNumber,Status,DataEntrada,DataSaida,Descricao,Observacoes,Clienteid,id],
    (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar equipamento', detalhes: err.message });
      
      if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Equipamento não encontrado' });
    }

      res.json({ sucesso: true, mensagem: 'Equipamento atualizado com sucesso' });
    });
};

exports.deletarproduto = (req, res) => {
  const idEquipamento = parseInt(req.params.id);
  if (!idEquipamento) return res.status(400).json({ erro: 'ID do produto não fornecido' });

  db.query('DELETE FROM equipamento WHERE idEquipamento = ?', [idEquipamento], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar produto', detalhes: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'produto não encontrado' });

    res.json({ sucesso: true, mensagem: 'produto deletado com sucesso' });
  });
};

exports.buscarProdutos = (req, res) => {
  const {nome,Tipo,Marca,SerialNumber,Status,DataEntrada,DataSaida,Clienteid,id} = req.query;

  let sql = 'SELECT * FROM equipamento WHERE 1=1';
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
  if (Clienteid) {
    sql += ' AND Cliente_idcliente = ?';
    params.push(Clienteid);
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
