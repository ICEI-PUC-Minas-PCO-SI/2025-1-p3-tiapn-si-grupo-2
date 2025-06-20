const bcrypt = require('bcrypt');
const { getConnection } = require('../db');
const jwt = require('jsonwebtoken');

exports.loginFuncionario = async (req, res) => {
  const { Nome, Senha } = req.body;

  if (!Nome || !Senha) {
    return res.status(400).json({ erro: 'Nome e Senha são obrigatórios' });
  }

  try {
    const db = getConnection();

    const [rows] = await db.query(
      'SELECT * FROM Funcionario WHERE Nome = ?',
      [Nome]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Funcionário não encontrado' });
    }

    const funcionario = rows[0];
    const senhaCorreta = await bcrypt.compare(Senha, funcionario.Senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    // 🔐 Gera token JWT
    const token = jwt.sign(
      {
        idUsuario: funcionario.idUsuario,
        TipoUsuario: funcionario.TipoUsuario,
      },
      process.env.JWT_SECRET || 'chave-secreta-padrao',
      {
        subject: funcionario.idUsuario.toString(),
        expiresIn: '30m'
      }
    );

    return res.json({
      sucesso: true,
      mensagem: 'Login bem-sucedido',
      token,
      funcionario: {
        idUsuario: funcionario.idUsuario,
        Nome: funcionario.Nome,
        TipoUsuario: funcionario.TipoUsuario
      }
    });

  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno', detalhes: err.message });
  }
};
