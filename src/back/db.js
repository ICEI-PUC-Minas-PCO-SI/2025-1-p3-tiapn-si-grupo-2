const mysql = require("mysql2/promise");

let connection;

async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "fixwise2.mysql.database.azure.com",
      user: "fixwise", 
      password: "Vitor@2016",
      database: "fixwise",
      port: 3306,
      ssl: {
        rejectUnauthorized: true // ou false se der erro de certificado
      }
    });
    console.log("✅ Banco de dados conectado");
  }
  return connection;
}

async function disconnect() {
  if (connection) {
    await connection.end();
    console.log("❌ Banco de dados desconectado");
    connection = null;
  }
}

function getConnection() {
  if (!connection) {
    throw new Error("Banco não conectado. Execute connect() primeiro.");
  }
  return connection;
}

module.exports = { connect, disconnect, getConnection };
