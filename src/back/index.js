const express = require('express');
const app = express();
const db = require('./db');
const clienteRoutes = require('./Routes/clienteRoutes');
const equipamentoRoutes = require('./Routes/equipamentoRoutes');
const servicoController = require('./Route/servicoController');
app.use(express.json());
app.use('/cliente', clienteRoutes);
app.use('/equipamento', equipamentoRoutes);
app.use('/servico', servicoController);

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { fixwise: app, db };
