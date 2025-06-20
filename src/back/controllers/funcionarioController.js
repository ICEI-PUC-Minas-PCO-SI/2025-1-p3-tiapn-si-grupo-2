const { getConnection } = require('../db');
const bcrypt = require('bcrypt');

// Buscar todos os funcionários com filtros opcionais
exports.getFuncionarios = async (req, res) => {
  const { nome, tipo } = req.query;

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

  try {
    const db = getConnection();
    const [results] = await db.query(sql, params);
    res.json({ sucesso: true, total: results.length, funcionarios: results });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar funcionários', detalhes: err.message });
  }
};

// Buscar funcionário por ID
exports.getFuncionarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getConnection();
    const [results] = await db.query('SELECT * FROM Funcionario WHERE idUsuario = ?', [id]);

    if (results.length === 0) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar funcionário', detalhes: err.message });
  }
};

// Criar funcionário
exports.createFuncionario = async (req, res) => {
  const { Nome, Senha, TipoUsuario } = req.body;

  if (!Nome || !Senha || !TipoUsuario) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando',
      campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario']
    });
  }

  try {
    const db = getConnection();

    const [existingUser] = await db.query('SELECT * FROM Funcionario WHERE Nome = ?', [Nome]);

    if (existingUser.length > 0) {
      return res.status(409).json({ erro: 'Já existe um funcionário com esse nome' });
    }

    const hashedPassword = await bcrypt.hash(Senha, 10);
    
    if (![1, 2].includes(Number(TipoUsuario))) {
  return res.status(400).json({ erro: 'TipoUsuario inválido. Use 1 (Funcionário) ou 2 (Administrador).' });
}
  
    const [result] = await db.query(
      'INSERT INTO Funcionario (Nome, Senha, TipoUsuario) VALUES (?, ?, ?)',
      [Nome, hashedPassword, TipoUsuario]
    );

    res.status(201).json({
      sucesso: true,
      mensagem: 'Funcionário criado com sucesso',
      idUsuario: result.insertId,
      dados: { Nome, TipoUsuario }
    });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar funcionário', detalhes: err.message });
  }
};

// Login funcionário
exports.loginFuncionario = async (req, res) => {
  const { Nome, Senha } = req.body;

  if (!Nome || !Senha) {
    return res.status(400).json({ erro: 'Nome e Senha são obrigatórios' });
  }

  try {
    const db = getConnection();
    const [results] = await db.query('SELECT * FROM Funcionario WHERE Nome = ?', [Nome]);

    if (results.length === 0) {
      return res.status(401).json({ erro: 'Funcionário não encontrado' });
    }

    const funcionario = results[0];

    const senhaValida = await bcrypt.compare(Senha, funcionario.Senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    res.json({ sucesso: true, mensagem: 'Login bem-sucedido', funcionario });

  } catch (err) {
    res.status(500).json({ erro: 'Erro no login', detalhes: err.message });
  }
};

// Atualizar funcionário por ID
exports.atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { Nome, Senha, TipoUsuario } = req.body;

  if (!Nome || !Senha || !TipoUsuario) {
    return res.status(400).json({
      erro: 'Campos obrigatórios faltando para atualização',
      campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario']
    });
  }

  try {
    const db = getConnection();

    const hashedPassword = await bcrypt.hash(Senha, 10);

    const [result] = await db.query(
      'UPDATE Funcionario SET Nome = ?, Senha = ?, TipoUsuario = ? WHERE idUsuario = ?',
      [Nome, hashedPassword, TipoUsuario, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.json({ sucesso: true, mensagem: 'Funcionário atualizado com sucesso' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar funcionário', detalhes: err.message });
  }
};

// Deletar funcionário por ID
exports.deleteFuncionario = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getConnection();
    const [result] = await db.query('DELETE FROM Funcionario WHERE idUsuario = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Funcionário não encontrado' });
    }

    res.json({ sucesso: true, mensagem: 'Funcionário deletado com sucesso' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar funcionário', detalhes: err.message });
  }
};
