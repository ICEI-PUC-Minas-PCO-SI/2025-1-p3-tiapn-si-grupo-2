const db = require('../db'); // Certifique-se de que este db.js retorna conexões de Promise

// Função auxiliar para tratamento de erro e resposta (reutilizável)
const handleError = (res, message, err, status = 500) => {
    console.error(`Erro: ${message}`, err);
    res.status(status).json({ erro: message, detalhes: err.message || err });
};

exports.criarEquipamento = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
    }

    const { Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao,
        Observacoes, Cliente_idCliente } = req.body;

    if (!Nome || !Tipo || !Marca || !SerialNumber || !Cliente_idCliente) {
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando',
            campos_obrigatorios: ['Nome', 'Tipo', 'Marca', 'SerialNumber', 'Cliente_idCliente']
        });
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // 1. Verifica se já existe um equipamento com o mesmo serialnumber
        const sqlVerifica = `SELECT idEquipamento FROM equipamento WHERE SerialNumber = ? LIMIT 1`;
        const [existingEquipments] = await connection.query(sqlVerifica, [SerialNumber]);

        if (existingEquipments.length > 0) {
            return res.status(409).json({
                erro: 'Equipamento já cadastrado',
                detalhes: 'Já existe um equipamento com o mesmo Serial Number'
            });
        }

        // 2. Verifica se o Cliente_idCliente existe
        const sqlCheckCliente = 'SELECT idCliente FROM cliente WHERE idCliente = ?';
        const [clienteResults] = await connection.query(sqlCheckCliente, [Cliente_idCliente]);
        if (clienteResults.length === 0) {
            return res.status(400).json({ erro: `Cliente com ID ${Cliente_idCliente} não encontrado.` });
        }

        // 3. Insere o equipamento
        const sqlInsertEquipamento = `INSERT INTO equipamento 
            (Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao, Observacoes, Cliente_idCliente) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [resultInsert] = await connection.query(
            sqlInsertEquipamento,
            [Nome, Tipo, Marca || null, SerialNumber, Status || null, DataEntrada || null, DataSaida || null, Descricao || null,
                Observacoes || null, Cliente_idCliente]
        );

        // 4. Insere no histórico de atividades (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Novo cadastro de equipamento: ${Nome}`;
        const tabelaAfetada = "Equipamento";
        const dataRegistro = new Date();

        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (criar equipamento):", err));

        res.status(201).json({
            sucesso: true,
            mensagem: 'Equipamento cadastrado com sucesso',
            id: resultInsert.insertId,
            dados: { Nome, Tipo: Tipo || 'Não informado' }
        });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao criar equipamento', err);
    } finally {
        // if (connection) connection.release(); // Libera a conexão
    }
};

exports.atualizarEquipamento = async (req, res) => {
    const { id } = req.params;
    const { Nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Descricao,
        Observacoes, Cliente_idCliente } = req.body;

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // Opcional: Verificar se o cliente_id existe, se for alterado.
        if (Cliente_idCliente) {
            const sqlCheckCliente = 'SELECT idCliente FROM cliente WHERE idCliente = ?';
            const [clienteResults] = await connection.query(sqlCheckCliente, [Cliente_idCliente]);
            if (clienteResults.length === 0) {
                return res.status(400).json({ erro: `Cliente com ID ${Cliente_idCliente} não encontrado.` });
            }
        }

        // Opcional: Verificar se o SerialNumber já existe em outro equipamento (se o SerialNumber for alterado)
        if (SerialNumber) {
            const sqlCheckSerialNumber = 'SELECT idEquipamento FROM equipamento WHERE SerialNumber = ? AND idEquipamento != ? LIMIT 1';
            const [existingSerialNumber] = await connection.query(sqlCheckSerialNumber, [SerialNumber, id]);
            if (existingSerialNumber.length > 0) {
                return res.status(409).json({ erro: 'Já existe outro equipamento com este Serial Number.' });
            }
        }

        // Obter nome do equipamento para o histórico antes de atualizar
        const [currentEquipamento] = await connection.query("SELECT Nome FROM equipamento WHERE idEquipamento = ?", [id]);
        const nomeEquipamentoParaHistorico = currentEquipamento.length > 0 ? currentEquipamento[0].Nome : 'Desconhecido';


        const sqlUpdateEquipamento = `
            UPDATE equipamento SET 
                Nome = ?, Tipo = ?, Marca = ?, SerialNumber = ?, Status = ?, 
                DataEntrada = ?, DataSaida = ?, Descricao = ?, Observacoes = ?,
                Cliente_idCliente = ? 
            WHERE idEquipamento = ?
        `;

        const [resultUpdate] = await connection.query(
            sqlUpdateEquipamento,
            [Nome, Tipo, Marca || null, SerialNumber, Status || null, DataEntrada || null, DataSaida || null, Descricao || null,
                Observacoes || null, Cliente_idCliente, id]
        );

        if (resultUpdate.affectedRows === 0) {
            return res.status(404).json({ erro: 'Equipamento não encontrado para atualização' });
        }

        res.json({ sucesso: true, mensagem: 'Equipamento atualizado com sucesso' });

        // Inserir no histórico (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Atualização do equipamento: ${Nome || nomeEquipamentoParaHistorico}`; // Usa o nome atualizado ou o antigo
        const tabelaAfetada = "Equipamento";
        const dataRegistro = new Date();
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (atualizar equipamento):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao atualizar equipamento', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.deletarEquipamento = async (req, res) => {
    const idEquipamento = parseInt(req.params.id);
    if (isNaN(idEquipamento)) {
        return res.status(400).json({ erro: 'ID do Equipamento inválido ou não fornecido' });
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão

        // 1. Obter nome do equipamento para o histórico antes de deletar
        const [equipamentoData] = await connection.query("SELECT Nome FROM equipamento WHERE idEquipamento = ?", [idEquipamento]);
        if (equipamentoData.length === 0) {
            return res.status(404).json({ erro: 'Equipamento não encontrado para deletar' });
        }
        const nomeEquipamento = equipamentoData[0].Nome;

        // 2. Deletar equipamento
        const [resultDelete] = await connection.query('DELETE FROM equipamento WHERE idEquipamento = ?', [idEquipamento]);

        if (resultDelete.affectedRows === 0) {
            return res.status(404).json({ erro: 'Equipamento não encontrado para deletar' });
        }

        res.json({ sucesso: true, mensagem: 'Equipamento deletado com sucesso' });

        // 3. Inserir no histórico (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Equipamento deletado: ${nomeEquipamento}`;
        const tabelaAfetada = "Equipamento";
        const dataRegistro = new Date();
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (deletar equipamento):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao deletar equipamento', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.buscarEquipamentos = async (req, res) => {
    const { nome, Tipo, Marca, SerialNumber, Status, DataEntrada, DataSaida, Cliente_idCliente, id } = req.query;

    let sql = 'SELECT equipamento.*, cliente.Nome clienteNome FROM equipamento INNER JOIN cliente on (cliente.idCliente = equipamento.Cliente_idCliente) WHERE 1=1';
    const params = [];

    if (nome) {
        sql += ' AND equipamento.Nome LIKE ?'; // Adicionado equipamento. para evitar ambiguidade
        params.push(`%${nome}%`);
    }
    if (Tipo) {
        sql += ' AND Tipo LIKE ?';
        params.push(`%${Tipo}%`);
    }
    if (Marca) {
        sql += ' AND Marca LIKE ?';
        params.push(`%${Marca}%`);
    }
    if (SerialNumber) {
        sql += ' AND SerialNumber LIKE ?';
        params.push(`%${SerialNumber}%`);
    }
    if (Status) {
        sql += ' AND Status = ?';
        params.push(Status);
    }
    if (DataEntrada) {
        sql += ' AND DataEntrada = ?';
        params.push(DataEntrada);
    }
    if (DataSaida) {
        sql += ' AND DataSaida = ?';
        params.push(DataSaida);
    }
    if (Cliente_idCliente) {
        sql += ' AND Cliente_idCliente = ?';
        params.push(Cliente_idCliente);
    }
    if (id) {
        sql += ' AND idEquipamento = ?';
        params.push(id);
    }

    let connection;
    try {
        connection = await db.getConnection(); // Obtém conexão
        const [results] = await connection.query(sql, params);

        if (results.length === 0) {
            return res.status(404).json({ erro: 'Nenhum equipamento encontrado com os filtros informados' });
        }

        res.json({ sucesso: true, total: results.length, equipamentos: results }); // Alterei de 'equipamento' para 'equipamentos' (plural)

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao buscar equipamentos', err);
    } finally {
        // if (connection) connection.release();
    }
};