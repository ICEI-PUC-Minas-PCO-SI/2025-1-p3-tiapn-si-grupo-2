import mysql from 'mysql2'

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'fixwise'
})

db.connect((error) =>{
    error ? console.log(error) : console.log("Sucesso na conexão!")
})

export default db