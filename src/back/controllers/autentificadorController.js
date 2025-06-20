const bcrypt = require('bcrypt');
const { getConnection } = require('../db');
const jwt = require('jsonwebtoken');

exports.loginFuncionario = async (req, res) => {
  const { Nome, Senha } = req.body;

  if (!Nome || !Senha) {
    return res.status(400).json({ erro: 'Nome e senha são obrigatórios.' });
  }

  try {
    const db = getConnection();

    const [rows] = await db.query(
      'SELECT idUsuario, Nome, TipoUsuario, Senha FROM Funcionario WHERE Nome = ?',
      [Nome.trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: 'Funcionário não encontrado.' });
    }

    const funcionario = rows[0];
    const senhaCorreta = await bcrypt.compare(Senha, funcionario.Senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Senha incorreta.' });
    }

    const payload = {
      idUsuario: funcionario.idUsuario,
      TipoUsuario: funcionario.TipoUsuario,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      subject: funcionario.idUsuario.toString(),
      expiresIn: '30m'
    });

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Login bem-sucedido.',
      token,
      funcionario: {
        idUsuario: funcionario.idUsuario,
        Nome: funcionario.Nome,
        TipoUsuario: funcionario.TipoUsuario
      }
    });

  } catch (err) {
    console.error('Erro no loginFuncionario:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};
