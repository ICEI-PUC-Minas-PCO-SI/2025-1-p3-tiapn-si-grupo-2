const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fixwise"
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erro de conexão:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL conectado!");
});

module.exports = db;
