import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Rota principal");
});

app.listen(PORT, () => {
  console.log(`Ouvindo na porta: ${PORT}`);
});

app.get("/acessos", (req, res) => {
  db.query("SELECT * FROM cadastroacesso", (err, results) => {
    if (err) {
      res.send(`Erro: ${err}`);
    }
    res.json(results);
  });
});

app.get('/acessos/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * from cadastroacesso WHERE idAcesso = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.json(results);
  });
});

app.post("/acessos", (req, res) => {
  const { cpf, nome, matricula, nivelAcesso, descricao, observacoes, senha } =
    req.body;
  const sql =
    "INSERT INTO cadastroacesso (cpf, nome, matricula, nivelAcesso, descricao, observacoes, senha) VALUES (?,?,?,?,?,?, ?)";

  db.query(
    sql,
    [cpf, nome, matricula, nivelAcesso, descricao, observacoes, senha],
    (err) => {
      if (err) {
        return res.send(`Erro: ${err}`);
      }
      return res.send("Cadastro realizado com sucesso!");
    }
  );
});

app.put("/acessos/:id", (req, res) =>{
  const {id} = req.params;
  const { cpf, nome, matricula, nivelAcesso, descricao, observacoes, senha }  = req.body;
  const sql = "UPDATE cadastroacesso SET cpf = ?, nome = ?, matricula = ?, nivelAcesso = ?, descricao = ?, observacoes = ?, senha = ? WHERE idAcesso = ?";
  db.query(sql, [cpf, nome, matricula, nivelAcesso, descricao, observacoes, senha , id], (err) =>{
    if(err){
        return res.send(`Erro: ${err}`)
    }
    return res.status(200).send("Atualização realizada com sucesso!")
  })
})

app.delete("/acessos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE from cadastroacesso WHERE idAcesso = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.status(200).send("Acesso deletado com sucesso!");
  });
});

app.post("/cadastros-login", (req, res) => {
  const { matricula, senha } = req.body;
  const sql = "SELECT * FROM cadastroacesso WHERE Matricula = ? AND Senha = ?";
  db.query(sql, [matricula, senha], (err, results) => {
    if (results.length > 0) {
      res.json({ sucesso: true, usuario: results[0] });
    } else {
      res.json({ sucesso: false, msg: "Credenciais inválidas" });
    }
  });
});

app.get("/clientes", (req, res) => {
  const sql = "SELECT * FROM cliente";
  db.query(sql, (err, results) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.json(results);
  });
});

app.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cliente WHERE idCliente = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.json(results);
  });
});

app.post("/clientes", (req, res) => {
  const { cpfCnpj, nome, uf, cidade, bairro, logradouro, numero, complemento, email, descricao, observacoes, cep, telefone } = req.body;
  const sql = "INSERT INTO cliente (CPF_CNPJ, Nome, UF, Cidade, Bairro, Logradouro, Numero, Complemento, EmailContato, Descricao, Observacoes, CEP, TelefoneContato) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sql, [cpfCnpj, nome, uf, cidade, bairro, logradouro, numero, complemento, email, descricao, observacoes, cep, telefone], (err) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.status(200).send("Cliente cadastrado com sucesso!");
  });
});

app.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cliente WHERE idCliente = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.status(200).send("Cliente deletado com sucesso!");
  });
});

app.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { cpfCnpj, nome, uf, cidade, bairro, logradouro, numero, complemento, email, descricao, observacoes, cep, telefone } = req.body;
  const sql = "UPDATE cliente SET CPF_CNPJ = ?, Nome = ?, UF = ?, Cidade = ?, Bairro = ?, Logradouro = ?, Numero = ?, Complemento = ?, EmailContato = ?, Descricao = ?, Observacoes = ?, CEP = ?, TelefoneContato = ? WHERE idCliente = ?";
  db.query(sql, [cpfCnpj, nome, uf, cidade, bairro, logradouro, numero, complemento, email, descricao, observacoes, cep, telefone, id], (err) => {
    if (err) {
      return res.send(`Erro: ${err}`);
    }
    return res.status(200).send("Atualização realizada com sucesso!");
  });
});

