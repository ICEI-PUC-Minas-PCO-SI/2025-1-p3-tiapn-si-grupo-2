const db = require('../db'); // Certifique-se de que este db.js retorna conexões de Promise

// Função auxiliar para tratamento de erro e resposta
const handleError = (res, message, err, status = 500) => {
    console.error(`Erro: ${message}`, err);
    res.status(status).json({ erro: message, detalhes: err.message || err });
};

exports.criarmanutencao = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
    }

    const { equipamento_id, dataentrada, dataprazo, responsavel, status, Descricao, Observacoes } = req.body;

    if (!equipamento_id || !dataentrada || !responsavel || !status) {
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando',
            campos_obrigatorios: ['equipamento_id', 'dataentrada', 'responsavel']
        });
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // 1. Verifica se o equipamento existe
        const sqlCheckEquipamento = 'SELECT idEquipamento, Nome FROM equipamento WHERE idEquipamento = ?';
        const [equipamentoResults] = await connection.query(sqlCheckEquipamento, [equipamento_id]);

        if (equipamentoResults.length === 0) {
            return res.status(400).json({ erro: `Equipamento com id ${equipamento_id} não encontrado` });
        }
        const nomeEquipamento = equipamentoResults[0].Nome; // Pega o nome do equipamento

        // 2. Verifica se o funcionário existe
        const sqlCheckFuncionario = 'SELECT idUsuario FROM funcionario WHERE idUsuario = ?';
        const [funcionarioResults] = await connection.query(sqlCheckFuncionario, [responsavel]);

        if (funcionarioResults.length === 0) {
            return res.status(400).json({ erro: `Funcionário com id ${responsavel} não encontrado` });
        }

        // 3. Insere no banco (Manutenção)
        const sqlInsertManutencao = `INSERT INTO cadastromanutencao 
            (Equipamento_idEquipamento, DataEntrada, DataSaida, ResponsavelManutencao, Status, Descricao, Observacoes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const [resultManutencao] = await connection.query(
            sqlInsertManutencao,
            [equipamento_id, dataentrada, dataprazo || null, responsavel, status || null, Descricao || null, Observacoes || null]
        );

        // 4. Insere no histórico de atividades
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Novo cadastro de manutenção para o equipamento: ${nomeEquipamento}`;
        const tabelaAfetada = "Manutenção";
        const dataRegistro = new Date(); // Obtenha a data aqui

        // Não precisa aguardar essa query para retornar a resposta da manutenção
        // Mas se falhar, é bom logar o erro
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (criar manutenção):", err));

        res.status(201).json({
            sucesso: true,
            mensagem: 'Manutenção cadastrada com sucesso',
            id: resultManutencao.insertId,
            dados: {
                equipamento_id,
                dataentrada,
                dataprazo: dataprazo || null,
                responsavel,
                status: status || 'Não informado',
                Descricao: Descricao || 'Não informado',
                Observacoes: Observacoes || 'Nenhuma observação'
            }
        });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao criar manutenção', err);
    } finally {
        // if (connection) connection.release(); // Libera a conexão
    }
};

exports.atualizarManutencao = async (req, res) => {
    const { id } = req.params;
    const { equipamento_id, dataentrada, dataprazo, responsavel, status, Descricao, Observacoes } = req.body;

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // 1. Obter nome do equipamento para o histórico
        const [equipamentoResults] = await connection.query("SELECT Nome FROM equipamento WHERE idEquipamento = ?", [equipamento_id]);
        if (equipamentoResults.length === 0) {
            // Isso pode acontecer se o equipamento_id for inválido na atualização
            return res.status(400).json({ erro: `Equipamento com id ${equipamento_id} não encontrado para atualização` });
        }
        const nomeEquipamento = equipamentoResults[0].Nome;

        // 2. Atualizar manutenção
        const sql = `
            UPDATE cadastromanutencao 
            SET 
              DataEntrada = ?, 
              DataSaida = ?, 
              ResponsavelManutencao = ?, 
              Status = ?, 
              Descricao = ?, 
              Observacoes = ?, 
              Equipamento_idEquipamento = ?
            WHERE idManutencao = ?
        `;

        const [resultUpdate] = await connection.query(sql, [
            dataentrada,
            dataprazo || null,
            responsavel,
            status || null,
            Descricao || null,
            Observacoes || null,
            equipamento_id,
            id
        ]);

        if (resultUpdate.affectedRows === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada para atualização' });
        }

        res.json({ sucesso: true, mensagem: 'Manutenção atualizada com sucesso' });

        // 3. Inserir no histórico (não precisa aguardar)
        const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Atualização da manutenção do equipamento: ${nomeEquipamento}`;
        const tabelaAfetada = "Manutenção";
        const dataRegistro = new Date();
        connection.query(historico, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (atualizar manutenção):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao atualizar manutenção', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.deletarManutencao = async (req, res) => {
    const idManutencao = parseInt(req.params.id);
    if (isNaN(idManutencao)) { // Melhorar a validação de ID
        return res.status(400).json({ erro: 'ID da manutenção inválido ou não fornecido' });
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // 1. Obter id do equipamento para o histórico
        const sqlGetEquipamentoId = "SELECT equipamento.Nome FROM equipamento INNER JOIN cadastromanutencao ON equipamento.idEquipamento = cadastromanutencao.Equipamento_idEquipamento WHERE cadastromanutencao.idManutencao = ?";
        const [equipamentoData] = await connection.query(sqlGetEquipamentoId, [idManutencao]);

        if (equipamentoData.length === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada para deletar' });
        }
        const nomeEquipamento = equipamentoData[0].Nome;

        // 2. Deletar manutenção
        const sqlDeleteManutencao = 'DELETE FROM cadastromanutencao WHERE idManutencao = ?';
        const [resultDelete] = await connection.query(sqlDeleteManutencao, [idManutencao]);

        if (resultDelete.affectedRows === 0) {
            return res.status(404).json({ erro: 'Manutenção não encontrada para deletar' });
        }

        res.json({ sucesso: true, mensagem: 'Manutenção deletada com sucesso' });

        // 3. Inserir no histórico (não precisa aguardar)
        const historico = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Manutenção deletada do equipamento: ${nomeEquipamento}`;
        const tabelaAfetada = "Manutenção";
        const dataRegistro = new Date();
        connection.query(historico, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (deletar manutenção):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao deletar manutenção', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.buscarManutencao = async (req, res) => {
    const { equipamento_id, dataentrada, datasaida, responsavel, status } = req.query;

    let sql = `
        SELECT 
            cadastromanutencao.*, 
            funcionario.Nome AS nomeResponsavel, 
            equipamento.Nome AS nomeEquipamento, 
            cliente.Nome AS nomeCliente 
        FROM cadastromanutencao 
        INNER JOIN funcionario ON funcionario.idUsuario = cadastromanutencao.ResponsavelManutencao 
        INNER JOIN equipamento ON equipamento.idEquipamento = cadastromanutencao.Equipamento_idEquipamento 
        INNER JOIN cliente ON cliente.idCliente = equipamento.Cliente_idCliente 
        WHERE 1=1
    `;
    const params = [];

    if (equipamento_id) {
        sql += ' AND Equipamento_idEquipamento = ?';
        params.push(equipamento_id);
    }
    if (dataentrada) {
        sql += ' AND DataEntrada = ?';
        params.push(dataentrada);
    }
    if (datasaida) {
        sql += ' AND DataSaida = ?';
        params.push(datasaida);
    }
    if (responsavel) {
        sql += ' AND ResponsavelManutencao = ?';
        params.push(responsavel);
    }
    if (status) {
        sql += ' AND Status = ?';
        params.push(status);
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão
        const [results] = await connection.query(sql, params); // Executa a query

        if (results.length === 0) {
            return res.status(404).json({ erro: 'Nenhuma manutenção encontrada com os filtros informados' });
        }

        res.json({ sucesso: true, total: results.length, manutencoes: results });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao buscar manutenções', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.listaManutencoesPendentes = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const sql = `
            SELECT 
                M.idManutencao, 
                M.DataEntrada, 
                M.status, 
                E.Nome nomeEquipamento, 
                F.Nome nomeFuncionario 
            FROM cadastromanutencao M 
            INNER JOIN FUNCIONARIO F ON (F.idUsuario = M.ResponsavelManutencao) 
            INNER JOIN EQUIPAMENTO E ON (E.idEquipamento = M.Equipamento_idEquipamento) 
            WHERE M.STATUS = "Pendente"
        `;
        const [results] = await connection.query(sql);

        res.json({ sucesso: true, total: results.length, manutencoes: results });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao listar manutenções pendentes', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.listaManutencoesPorMes = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const sql = 'SELECT COUNT(*) quant, date_format(dataentrada, "%Y%m") Mes FROM cadastromanutencao group by mes order by mes';
        const [results] = await connection.query(sql);

        res.json({ sucesso: true, manutencoes: results });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao listar manutenções por mês', err);
    } finally {
        // if (connection) connection.release();
    }
};