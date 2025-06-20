const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'chave-secreta-padrao', (err, usuario) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }

    req.usuario = usuario; // 🔥 Salva os dados do token na requisição
    next();
  });
}

module.exports = autenticarToken;
