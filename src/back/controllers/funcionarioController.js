const db = require('../db');
const bcrypt = require('bcrypt');

// Buscar todos os funcionários com filtros opcionais
exports.getFuncionarios = (req, res) => {
  const { nome, tipo, email } = req.query; 

  let sql = 'SELECT * FROM Funcionario WHERE 1=1';
  const params = [];

  if (nome) {
    sql += ' AND Nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (tipo) {
    sql += ' AND TipoUsuario = ?';
    params.push(tipo);
  }

  if (email) {
    sql += ' AND Email = ?';
    params.push(`%${email}%`);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar funcionários', detalhes: err.message });
    res.json({ sucesso: true, total: results.length, funcionarios: results });
  });
};

// Buscar funcionário por ID
exports.getFuncionarioById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM Funcionario WHERE idUsuario = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar funcionário', detalhes: err.message });
    if (results.length === 0) return res.status(404).json({ erro: 'Funcionário não encontrado' });
    res.json(results[0]);
  });
};

exports.createFuncionario = async (req, res) => {  
  const saltRounds = 10;

  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Erro: Corpo da requisição ausente ou inválido');
    return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
  }

  const { Nome, Senha, TipoUsuario, Email } = req.body;
  if (!Nome || !Senha || !TipoUsuario || !Email) {
    console.error('Erro: Campos obrigatórios faltando', { Nome, Senha, TipoUsuario, Email });
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario', 'Email']
    });
  }

  try {    console.log('Verificando se já existe um funcionário com o email:', Email);
    const [existingUser] = await db.promise().query('SELECT * FROM Funcionario WHERE Email = ?', [Email]);

    if (existingUser.length > 0) {
      console.error('Erro: Já existe um funcionário com esse email');
      return res.status(409).json({ erro: 'Já existe um funcionário com esse email' });
    }

    // console.log('Criptografando a senha');
    // const hashedPassword = await bcrypt.hash(Senha, saltRounds);    console.log('Inserindo novo funcionário no banco de dados');
    const [result] = await db.promise().query(
      'INSERT INTO Funcionario (Nome, Senha, TipoUsuario, Email) VALUES (?, ?, ?, ?)',
      [Nome, Senha, TipoUsuario, Email]
    );

    console.log('Funcionário criado com sucesso, ID:', result.insertId);
    res.status(201).json({
      sucesso: true,
      mensagem: 'Funcionário criado com sucesso',
      idUsuario: result.insertId,
      dados: { Nome, TipoUsuario, Email }
    });

  } catch (err) {
    console.error('Erro ao criar funcionário:', err);
    res.status(500).json({ erro: 'Erro ao criar funcionário', detalhes: err.message });
  }
};

// Future do projeto

exports.loginFuncionario = async (req, res) => {
  const { email, password } = req.body; 

  if (!email || !password) {
    console.error('Erro: Email ou Senha ausentes no payload');
    return res.status(400).json({ erro: 'Email e Senha são obrigatórios' });
  }

  try {
    console.log('Executando query para buscar funcionário com email:', email);
    const [results] = await db.promise().query('SELECT * FROM Funcionario WHERE Email = ?', [email]);

    console.log('Resultado da query:', results);

    if (results.length === 0) {
      console.error('Erro: Funcionário não encontrado para o email:', email);
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    const funcionario = results[0];

    // Comparação direta da senha (não recomendado para produção)
    if (funcionario.Senha !== password) {
      console.error('Erro: Senha incorreta para o email:', email);
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    console.log('Login bem-sucedido para o email:', email);
    res.json({ sucesso: true, mensagem: 'Login bem-sucedido', funcionario });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ erro: 'Erro no login', detalhes: err.message });
  }
};

// Atualizar funcionário por ID
exports.atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { Nome, Senha, TipoUsuario, Email } = req.body;

  console.log('Iniciando atualização do funcionário...');
  console.log('Dados recebidos:', { id, Nome, Senha, TipoUsuario });

  if (!Nome || !Senha || !TipoUsuario) {
    console.error('Erro: Campos obrigatórios faltando para atualização');
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando para atualização',
      campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario', 'Email']
    });
  }

  try {
    // console.log('Criptografando a nova senha...');
    // const hashedPassword = await bcrypt.hash(Senha, 10);    console.log('Executando query de atualização no banco de dados...');
    const [result] = await db.promise().query(
      'UPDATE Funcionario SET Nome = ?, Senha = ?, TipoUsuario = ?, Email = ? WHERE idUsuario = ?',
      [Nome, Senha, TipoUsuario, Email, id]
    );

    console.log('Resultado da query:', result);

    if (result.affectedRows === 0) {
      console.error('Erro: Funcionário não encontrado para atualização');
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    console.log('Funcionário atualizado com sucesso!');
    res.json({ sucesso: true, mensagem: 'Funcionário atualizado com sucesso' });

  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);
    res.status(500).json({ erro: 'Erro ao atualizar funcionário', detalhes: err.message });
  }
};

// Deletar funcionário por ID
exports.deleteFuncionario = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Funcionario WHERE idUsuario = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao deletar funcionário', detalhes: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Funcionário não encontrado' });

    res.json({ sucesso: true, mensagem: 'Funcionário deletado com sucesso' });
  });
};
