const mysql = require('mysql2/promise');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#PaoDeQueijoComCafe1",
  database: "fixwise"
});

async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'fixwise'
    });
    console.log('✅ Banco de dados conectado');
  }
  return connection;
}

async function disconnect() {
  if (connection) {
    await connection.end();
    console.log('❌ Banco de dados desconectado');
    connection = null;
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('Banco não conectado. Execute connect() primeiro.');
  }
  return connection;
}

module.exports = { connect, disconnect, getConnection };
