const bcrypt = require('bcrypt');
const db = require('../db');
require('../controllers/funcionarioController');

exports.loginFuncionario = async (req, res) => {
  const { Nome, Senha } = req.body;

  if (!Nome || !Senha) {
    return res.status(400).json({ erro: 'Nome e Senha são obrigatórios' });
  }

  try {
    const [rows] = await db.promise().query(
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

    res.json({
      sucesso: true,
      mensagem: 'Login bem-sucedido',
      funcionario: {
        idUsuario: funcionario.idUsuario,
        Nome: funcionario.Nome,
        TipoUsuario: funcionario.TipoUsuario
      }
    });

  } catch (err) {
    res.status(500).json({ erro: 'Erro interno', detalhes: err.message });
  }
};
