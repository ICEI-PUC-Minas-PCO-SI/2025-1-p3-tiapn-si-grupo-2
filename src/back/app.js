require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connect } = require('./db');

// Importação das rotas
const clienteRoutes = require('./Routes/clienteRoutes');
const equipamentoRoutes = require('./Routes/equipamentoRoutes');
const servicoRoutes = require('./Routes/servicoRoutes');
const ordemServicoRoutes = require('./Routes/ordemServicoRoutes');
const manutencaoRoutes = require('./Routes/manutencaoRoutes');
const funcionarioRoutes = require('./Routes/funcionarioRoutes');
const autentificadorRoutes = require('./Routes/autentificadorRoutes');
const historicoAtividadesRoutes = require('./Routes/historicoAtividades')

const app = express();

// 🔌 Conecta no banco de dados
connect().catch(err => {
  console.error('❌ Erro ao conectar no banco de dados:', err.message);
  process.exit(1); // Se não conectar, encerra o app
});

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rotas
app.use('/cliente', clienteRoutes);
app.use('/equipamento', equipamentoRoutes);
app.use('/servico', servicoRoutes);
app.use('/ordemServico', ordemServicoRoutes);
app.use('/cadastromanutencao', manutencaoRoutes);
app.use('/funcionario', funcionarioRoutes);
app.use('/historico-atividades', historicoAtividadesRoutes)
app.use('/autentificador', autentificadorRoutes);

module.exports = app;
