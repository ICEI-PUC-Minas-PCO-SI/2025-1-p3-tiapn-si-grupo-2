function verificarAdmin(req, res, next) {
  const usuario = req.usuario;

  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  if (usuario.TipoUsuario !== 2) { // 2 = Admin
    return res.status(403).json({ erro: 'Acesso negado. Permissão apenas para administradores.' });
  }

  next();
}

module.exports = verificarAdmin;
