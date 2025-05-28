const { fixwise, db } = require('./server');

fixwise.get('/cliente', (req, res) => {

  const { cpf_cnpj, nome, email, telefone, cidade, bairro } = req.query;

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

  if (cidade) {
    sql += ' AND Cidade LIKE ?';
    params.push(`%${cidade}%`);
  }

  if (bairro) {
    sql += ' AND Bairro LIKE ?';
    params.push(`%${bairro}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erro no banco de dados: ', err);
      return res. status(500).json({
        erro: 'Erro interno no servidor',
        detalhes: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        erro: 'Nenhum cliente encontrado com os filtros informados'
      });
    }

    res.json ({
      sucesso: true,
      total: results.length,
      clientes: results
    });
  });


});
=======
  const { nome, cpf_cnpj, email, telefone, logradouro, cep, cidade, bairro, numero, uf } = req.body;

  let sql = 'SELECT' From Cliente WHERE 1 = 1;


})
>>>>>>> dfe9e241a6b2de7c80b6b78c796717ed4d333b62

fixwise.post('/cliente', (req, res) => {

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { nome, cpf_cnpj, email, telefone, logradouro, cep, cidade, bairro, numero, uf } = req.body;

  if (!nome || !cpf_cnpj || !logradouro || !cep || !cidade || !bairro || !numero || !uf) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['nome', 'cpf_cnpj', 'logradouro', 'cep', 'cidade', 'bairro', 'numero', 'uf']
    });
  }

  const sql = `INSERT INTO Cliente 
              (Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql,
    [nome, cpf_cnpj, email || null, telefone || null, logradouro, cep, cidade, bairro, numero, uf],
    (err, result) => {
      if (err) {
        console.error('Erro no banco de dados:', err);
        return res.status(500).json({
          erro: 'Erro interno no servidor',
          detalhes: err.message // Não exponha isso em produção!
        });
      }

      res.status(201).json({
        sucesso: true,
        mensagem: 'Cliente criado com sucesso',
        id: result.insertId,
        dados: { nome, email: email || 'Não informado' }
      });
    });
});

fixwise.delete('/cliente/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);

  if (!clienteId) {
    return res.status(400).json({ erro: 'ID do cliente não fornecido' });
  }
  const sql = 'DELETE FROM Cliente WHERE idCliente = ?';
  db.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error('Erro ao delete cliente:', err)
      return res.status(500).json({ erro: 'Erro ao deletar cliente' })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }
    res.json({ sucesso: true, mensagem: 'Cliente deletado com sucesso' });
  })
});

const PORT = 3000;
fixwise.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});