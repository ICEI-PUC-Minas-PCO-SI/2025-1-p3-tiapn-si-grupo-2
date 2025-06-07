const express = require('express');
const cors = require('cors');

const fixwise = express();

// Middlewares
fixwise.use(cors());
fixwise.use(express.json());

module.exports = fixwise;

const express = require('express');
const app = express();
const funcionarioRoutes = require('./Routes/funcionarioRoutes');

app.use(express.json());
app.use('/funcionarios', funcionarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});