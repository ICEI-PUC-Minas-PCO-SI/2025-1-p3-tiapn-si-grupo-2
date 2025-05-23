const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const fixwise = express();

fixwise.use(cors()); 
fixwise.use(express.json()); 

// Conexão com o MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // ⚠️ Nunca deixe vazio em produção!
  database: "fixwise"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erro de conexão:", err.message); 
    process.exit(1); // Encerra o processo se não conectar
  }
  console.log("✅ MySQL conectado!");
});

module.exports = { fixwise, db }; 