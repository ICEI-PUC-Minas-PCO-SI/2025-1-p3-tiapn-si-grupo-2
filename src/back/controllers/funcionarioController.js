const db = require('../db');

exports.getFuncionarios = (req, res) => {
  db.query('SELECT * FROM Funcionario', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getFuncionarioById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Funcionario WHERE idUsuario = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.json(results[0]);
  });
};

exports.createFuncionario = (req, res) => {
  const { Nome, Senha, TipoUsuario } = req.body;
  db.query(
    'INSERT INTO Funcionario (Nome, Senha, TipoUsuario) VALUES (?, ?, ?)',
    [Nome, Senha, TipoUsuario],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ idUsuario: results.insertId, Nome, Senha, TipoUsuario });
    }
  );
};

exports.deleteFuncionario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Funcionario WHERE idUsuario = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(204).send();
  });
};
