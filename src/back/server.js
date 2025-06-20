const app = require('./app');
const db = require('./db');

const PORT = process.env.PORT || 3010;

async function startServer() {
  try {
    await db.connect();

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('\n🛑 Encerrando servidor...');
      await db.disconnect();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();
