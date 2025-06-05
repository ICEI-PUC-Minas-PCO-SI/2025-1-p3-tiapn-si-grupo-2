const express = require('express');
const app = express();
const db = require('./db');
const clienteRoutes = require('./Routes/clienteRoutes');
const equipamentoRoutes = require('./Routes/equipamentoRoutes');
const servicoRoutes = require('./Routes/servicoRoutes');
const ordemServicoRoutes = require('./Routes/ordemServicoRoutes');
const manutencaoRoutes = require('./Routes/manutencaoRoutes')
app.use(express.json());
app.use('/cliente', clienteRoutes);
app.use('/equipamento', equipamentoRoutes);
app.use('/servico', servicoRoutes);
app.use('/ordemServico', ordemServicoRoutes);
app.use('/cadastromanutencao', manutencaoRoutes);

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { fixwise: app, db };
