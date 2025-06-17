const db = require('../db');

exports.buscarClientes = (req, res) => {
  const { cpf_cnpj, nome, email, telefone, logradouro, cep, cidade, bairro, numero, uf } = req.query;

  let sql = 'SELECT * FROM Cliente WHERE 1=1';
  const params = [];

  if (cpf_cnpj) {
    sql += ' AND CPF_CNPJ = ?';
    params.push(cpf_cnpj);
  }

  if (nome) {
    sql += ' AND Nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (email) {
    sql += ' AND EmailContato LIKE ?';
    params.push(`%${email}%`);
  }

  if (telefone) {
    sql += ' AND TelefoneContato LIKE ?';
    params.push(`%${telefone}%`);
  }

  if (logradouro) {
    sql += ' AND Logradouro LIKE ?';
    params.push(`%${logradouro}%`);
  }

  if (cep) {
    sql += ' AND CEP = ?';
    params.push(cep);
  }

  if (cidade) {
    sql += ' AND Cidade LIKE ?';
    params.push(`%${cidade}%`);
  }

  if (bairro) {
    sql += ' AND Bairro LIKE ?';
    params.push(`%${bairro}%`);
  }

  if (numero) {
    sql += ' AND Numero = ?';
    params.push(numero);
  }

  if (uf) {
    sql += ' AND UF = ?';
    params.push(uf);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Nenhum cliente encontrado com os filtros informados' });
    }

    res.json({ sucesso: true, total: results.length, clientes: results });
  });
};

exports.buscarClientePorId = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * from cliente WHERE idCliente = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro no banco de dados' });
    res.json(results);
  });
};

exports.criarCliente = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { nome, cpf_cnpj, email, telefone, logradouro, cep, cidade, bairro, numero, uf, descricao, observacoes } = req.body;

  if (!nome || !cpf_cnpj || !logradouro || !cep || !cidade || !bairro || !numero || !uf) {
    return res.status(400).json({

      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['nome', 'cpf_cnpj', 'logradouro', 'cep', 'cidade', 'bairro', 'numero', 'uf']
    });
  }

  const sql = `INSERT INTO Cliente 
    (Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF, descricao, observacoes) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
  const atividade = `Novo cadastro de cliente: ${nome}`;
  const tabelaAfetada = "Cliente";
  const dataRegistro = new Date();

  db.query(sql,
    [nome, cpf_cnpj, email || null, telefone || null, logradouro, cep, cidade, bairro, numero, uf, descricao || null, observacoes || null],
    (err, result) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
      }

      res.status(201).json({
        sucesso: true,
        mensagem: 'Cliente criado com sucesso',
        id: result.insertId,
        dados: { nome, email: email || 'Não informado' }
      });
      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })
    });
};

exports.atualizarCliente = (req, res) => {
  const { id } = req.params;
  const { cpf_cnpj, nome, email, telefone, logradouro, cep, cidade, bairro, numero, uf, descricao, observacoes } = req.body;

  const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
  const atividade = `Atualização do cliente: ${nome}`;
  const tabelaAfetada = "Cliente";
  const dataRegistro = new Date();



  db.query("UPDATE cliente SET nome = ?, cpf_cnpj = ?, emailContato = ?, TelefoneContato = ?, logradouro = ?, cep = ?, cidade = ?, bairro = ?, numero = ?, uf = ?, descricao = ?, observacoes = ? WHERE idCliente = ?",
    [nome, cpf_cnpj, email, telefone, logradouro, cep, cidade, bairro, numero, uf, descricao, observacoes, id],
    (err, results) => {
      if (err) return res.status(500).json({ erro: 'Erro ao atualizar cliente', detalhes: err.message });
      res.json({ req_body: req.body, sucesso: true, mensagem: 'Cliente atualizado com sucesso' });
      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })
    });
};

exports.deletarCliente = (req, res) => {
  const clienteId = parseInt(req.params.id);
  if (!clienteId) return res.status(400).json({ erro: 'ID do cliente não fornecido' });

  db.query('SELECT Nome from cliente where idCliente = ?', [clienteId], (err, results) => {
    if (err) {
      console.log(err)
    }
    const nomeCliente = results[0].Nome
    db.query('DELETE FROM Cliente WHERE idCliente = ?', [clienteId], (err, result) => {
      if (err) return res.status(500).json({ erro: 'Erro ao deletar cliente', detalhes: err.message });
      const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)"
      const atividade = `Cliete deletado: ${nomeCliente}`;
      const tabelaAfetada = "Cliente";
      const dataRegistro = new Date();
      if (result.affectedRows === 0) return res.status(404).json({ erro: 'Cliente não encontrado' });

      res.json({ sucesso: true, mensagem: 'Cliente deletado com sucesso' });
      db.query(historico, [atividade, dataRegistro, tabelaAfetada], (err, results) => {


      })

    });
  })


};