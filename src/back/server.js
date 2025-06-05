const express = require('express');
const db = require('./db')
const cors = require('cors')
const app = express();

const PORT = 3000;

app.use(cors())
app.use(express.json())

app.listen(PORT, () =>{
    console.log(`Ouvindo na porta ${PORT}`);
})

app.get('/', (req, res) =>{
    res.send("Rota principal!");
})

app.get('/clientes', (req, res) =>{
    db.query("SELECT * FROM clientes", (err, results) =>{
        res.json(results)
    })
})

app.get('/clientes/:id', (req, res) =>{
    const { id } = req.params
    db.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, results) =>{
        res.json(results)
    })
})

// app.put('/clientes/:id', (req, res) =>{
//     const {id} = req.params;
//     const { nome, idade, cidade } = req.body;
//     db.query(`UPDATE clientes SET NOME=${nome} IDADE=${idade}, CIDADE=${cidade} WHERE ID=${id}`, () =>{
//         res.json({ message: 'Atualizado com sucesso', changes: this.changes });
//     })
// })

app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;               // Pega o id da URL
  const { nome, idade, cidade } = req.body; // Pega os dados do corpo da requisição

  db.query(
    "UPDATE clientes SET nome = ?, idade = ?, cidade = ? WHERE id = ?", // Query com placeholders
    [nome, idade, cidade, id],                                          // Valores seguros para substituir os placeholders
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });    // Se erro, responde 500

      if (result.affectedRows === 0) {                                 // Se não encontrou cliente
        return res.status(404).json({ message: "Cliente não encontrado" });
      }

      res.json({ message: 'Atualizado com sucesso', changes: result.changedRows }); // Resposta de sucesso
    }
  );
});

app.delete('/clientes/:id', (req, res) =>{
    const {id} = req.params
    db.query('DELETE FROM clientes WHERE id = ?', [id], (err,result) =>{
        if(err){
            console.log(err)
        }
        res.json({message: "Cliente deletado com sucesso"})
    })
})

app.post('/clientes', (req, res) =>{    
    const { Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF } = req.body;
    
    db.query(
        'INSERT INTO clientes (Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF], 
        (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({ error: 'Erro ao inserir cliente', details: err.message });
            }
            res.json({ message: 'Cliente inserido com sucesso', id: result.insertId });
        }
    )
})