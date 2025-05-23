const { fixwise, db } = require('./server');

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