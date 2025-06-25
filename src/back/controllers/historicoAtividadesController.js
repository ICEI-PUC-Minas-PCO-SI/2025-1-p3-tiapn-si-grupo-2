const db = require('../db');


// Adicione 'async' aqui
exports.consultarHistoricoAtividades = async (req, res) => {
    const sql = "SELECT * from historicoatividades";
    let connection; // Para garantir que a conexão seja liberada no finally

    try {
        // Obtém uma conexão que permite 'await' para a query
        connection = await db.getConnection(); // Supondo que getConnection() retorna uma Promise de conexão

        // Use 'await' para a query e desestruture os resultados
        // [rows, fields] é o padrão do mysql2/promise
        const [results] = await connection.query(sql);

        // Se chegou aqui, a query foi bem-sucedida
        return res.json({ sucesso: true, total: results.length, historicoAtividades: results });

    } catch (err) {
        // Captura e trata qualquer erro que ocorra na Promise (conexão ou query)
        console.error("Erro ao buscar histórico de atividades:", err); // Log para depuração
        return res.status(500).json({ erro: 'Erro ao buscar histórico de atividades', detalhes: err.message });
    } finally {
        // É CRUCIAL liberar a conexão de volta para o pool
        if (connection) {
            // connection.release();
        }
    }
};