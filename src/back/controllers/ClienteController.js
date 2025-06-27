const db = require('../db'); // Certifique-se de que este db.js retorna conexões de Promise

// Função auxiliar para tratamento de erro e resposta (reutilizável)
const handleError = (res, message, err, status = 500) => {
    console.error(`Erro: ${message}`, err);
    res.status(status).json({ erro: message, detalhes: err.message || err });
};

exports.buscarClientes = async (req, res) => {
    const { cpf_cnpj, nome, email, telefone, logradouro, cep, cidade, bairro, numero, uf } = req.query;

    let sql = 'SELECT * FROM Cliente WHERE 1=1';
    const params = [];

    if (cpf_cnpj) {
        sql += ' AND CPF_CNPJ = ?';
        params.push(cpf_cnpj);
    }

    if (nome) {
        sql += ' AND Nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (email) {
        sql += ' AND EmailContato LIKE ?';
        params.push(`%${email}%`);
    }

    if (telefone) {
        sql += ' AND TelefoneContato LIKE ?';
        params.push(`%${telefone}%`);
    }

    if (logradouro) {
        sql += ' AND Logradouro LIKE ?';
        params.push(`%${logradouro}%`);
    }

    if (cep) {
        sql += ' AND CEP = ?';
        params.push(cep);
    }

    if (cidade) {
        sql += ' AND Cidade LIKE ?';
        params.push(`%${cidade}%`);
    }

    if (bairro) {
        sql += ' AND Bairro LIKE ?';
        params.push(`%${bairro}%`);
    }

    if (numero) {
        sql += ' AND Numero = ?';
        params.push(numero);
    }

    if (uf) {
        sql += ' AND UF = ?';
        params.push(uf);
    }

    let connection; // Declare connection para ser liberada no finally
    try {
        // ASSUMIR QUE db.getConnection() RETORNA UMA PROMISE DE CONEXÃO
        // OU QUE db.query() É DIRETAMENTE PROMISE-BASED, MAS db.getConnection().query() É MAIS COMUM.
        connection = await db.getConnection(); 
        const [results] = await connection.query(sql, params); // Mudei para connection.query()

        if (results.length === 0) {
            return res.status(404).json({ erro: 'Nenhum cliente encontrado com os filtros informados' });
        }

        res.json({ sucesso: true, total: results.length, clientes: results });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao buscar clientes', err);
    } finally {
        // if (connection) connection.release(); // Libera a conexão
    }
};

exports.buscarClientePorId = async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await db.getConnection();
        const [results] = await connection.query("SELECT * FROM cliente WHERE idCliente = ?", [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado' });
        }
        res.json({ sucesso: true, cliente: results[0] }); // Retorne um único cliente se encontrado

    } catch (err) {
        handleError(res, 'Erro ao buscar cliente por ID', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.criarCliente = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: 'Corpo da requisição ausente ou inválido' });
    }

    const { nome, cpf_cnpj, email, telefone, logradouro, cep, cidade, bairro, numero, uf, descricao, observacoes } = req.body;

    if (!nome || !cpf_cnpj || !logradouro || !cep || !cidade || !bairro || !numero || !uf) {
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando',
            campos_obrigatorios: ['nome', 'cpf_cnpj', 'logradouro', 'cep', 'cidade', 'bairro', 'numero', 'uf']
        });
    }

    let connection;
    try {
        connection = await db.getConnection();

        const sqlVerificacaoClienteExistente = `select * from cliente where CPF_CNPJ = ${cpf_cnpj}`;

        const sqlInsertCliente = `INSERT INTO Cliente 
            (Nome, CPF_CNPJ, EmailContato, TelefoneContato, Logradouro, CEP, Cidade, Bairro, Numero, UF, descricao, observacoes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [resultInsert] = await connection.query(
            sqlInsertCliente,
            [nome, cpf_cnpj, email || null, telefone || null, logradouro, cep, cidade, bairro, numero, uf, descricao || null, observacoes || null]
        );

        // Inserir no histórico de atividades (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Novo cadastro de cliente: ${nome}`;
        const tabelaAfetada = "Cliente";
        const dataRegistro = new Date();
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (criar cliente):", err));

        res.status(201).json({
            sucesso: true,
            mensagem: 'Cliente criado com sucesso',
            id: resultInsert.insertId,
            dados: { nome, email: email || 'Não informado' }
        });

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao criar cliente', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { cpf_cnpj, nome, email, telefone, logradouro, cep, cidade, bairro, numero, uf, descricao, observacoes } = req.body;

    let connection;
    try {
        connection = await db.getConnection();

        const sqlUpdateCliente = `
            UPDATE cliente SET 
                nome = ?, 
                cpf_cnpj = ?, 
                emailContato = ?, 
                TelefoneContato = ?, 
                logradouro = ?, 
                cep = ?, 
                cidade = ?, 
                bairro = ?, 
                numero = ?, 
                uf = ?, 
                descricao = ?, 
                observacoes = ? 
            WHERE idCliente = ?
        `;

        const [resultUpdate] = await connection.query(
            sqlUpdateCliente,
            [nome, cpf_cnpj, email || null, telefone || null, logradouro, cep, cidade, bairro, numero, uf, descricao || null, observacoes || null, id]
        );

        if (resultUpdate.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado para atualização' });
        }

        res.json({ sucesso: true, mensagem: 'Cliente atualizado com sucesso' });

        // Inserir no histórico (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Atualização do cliente: ${nome}`;
        const tabelaAfetada = "Cliente";
        const dataRegistro = new Date();
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (atualizar cliente):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao atualizar cliente', err);
    } finally {
        // if (connection) connection.release();
    }
};

exports.deletarCliente = async (req, res) => {
    const clienteId = parseInt(req.params.id);
    if (isNaN(clienteId)) { // Melhorar validação
        return res.status(400).json({ erro: 'ID do cliente inválido ou não fornecido' });
    }

    let connection;
    try {
        connection = await db.getConnection();

        // 1. Obter nome do cliente para o histórico
        const [clienteNomeResult] = await connection.query('SELECT Nome FROM cliente WHERE idCliente = ?', [clienteId]);
        if (clienteNomeResult.length === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado para deletar' });
        }
        const nomeCliente = clienteNomeResult[0].Nome;

        // 2. Deletar cliente
        const [resultDelete] = await connection.query('DELETE FROM Cliente WHERE idCliente = ?', [clienteId]);

        if (resultDelete.affectedRows === 0) {
            return res.status(404).json({ erro: 'Cliente não encontrado para deletar' });
        }

        res.json({ sucesso: true, mensagem: 'Cliente deletado com sucesso' });

        // 3. Inserir no histórico (não precisa aguardar)
        const historicoSql = "INSERT INTO historicoatividades (atividade, data_registro, tabelaAfetada) values (?,?,?)";
        const atividade = `Cliente deletado: ${nomeCliente}`;
        const tabelaAfetada = "Cliente";
        const dataRegistro = new Date();
        connection.query(historicoSql, [atividade, dataRegistro, tabelaAfetada])
            .catch(err => console.error("Erro ao inserir no histórico (deletar cliente):", err));

    } catch (err) {
        handleError(res, 'Erro interno no servidor ao deletar cliente', err);
    } finally {
        // if (connection) connection.release();
    }
};