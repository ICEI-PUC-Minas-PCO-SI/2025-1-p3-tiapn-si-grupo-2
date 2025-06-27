const { getConnection } = require('../db'); // Apenas getConnection é necessário
const bcrypt = require('bcrypt');

// Função auxiliar para tratamento de erro e resposta
const handleError = (res, message, err, status = 500) => {
    console.error(`Erro: ${message}`, err);
    res.status(status).json({ erro: message, detalhes: err.message || err });
};

// Buscar todos os funcionários com filtros opcionais
exports.getFuncionarios = async (req, res) => {
    const { nome, tipo } = req.query;

    let sql = 'SELECT * FROM Funcionario WHERE 1=1';
    const params = [];

    if (nome) {
        sql += ' AND Nome LIKE ?';
        params.push(`%${nome}%`);
    }

    if (tipo) {
        sql += ' AND TipoUsuario = ?';
        params.push(tipo);
    }

    let connection; // Declare connection aqui
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ
        const [results] = await connection.query(sql, params); // Usa a conexão obtida
        res.json({ sucesso: true, total: results.length, funcionarios: results });
    } catch (err) {
        handleError(res, 'Erro ao buscar funcionários', err);
    } finally {
        // if (connection) connection.release(); // Libera a conexão
    }
};

// Buscar funcionário por ID
exports.getFuncionarioById = async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ
        const [results] = await connection.query('SELECT * FROM Funcionario WHERE idUsuario = ?', [id]); // Usa a conexão obtida

        if (results.length === 0) {
            return res.status(404).json({ erro: 'Funcionário não encontrado' });
        }

        res.json({ sucesso: true, funcionario: results[0] }); // Retornar um objeto consistente

    } catch (err) {
        handleError(res, 'Erro ao buscar funcionário', err);
    } finally {
        // if (connection) connection.release();
    }
};

// Criar funcionário
exports.createFuncionario = async (req, res) => {
    const { Nome, Senha, TipoUsuario } = req.body;

    if (!Nome || !Senha || !TipoUsuario) {
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando',
            campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario']
        });
    }

    if (![1, 2].includes(Number(TipoUsuario))) {
        return res.status(400).json({ erro: 'TipoUsuario inválido. Use 1 (Funcionário) ou 2 (Administrador).' });
    }

    let connection;
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ

        const [existingUser] = await connection.query('SELECT * FROM Funcionario WHERE Nome = ?', [Nome]); // Usa a conexão

        if (existingUser.length > 0) {
            return res.status(409).json({ erro: 'Já existe um funcionário com esse nome' });
        }

        const hashedPassword = await bcrypt.hash(Senha, 10);

        const [result] = await connection.query( // Usa a conexão
            'INSERT INTO Funcionario (Nome, Senha, TipoUsuario) VALUES (?, ?, ?)',
            [Nome, hashedPassword, TipoUsuario]
        );

        res.status(201).json({
            sucesso: true,
            mensagem: 'Funcionário criado com sucesso',
            idUsuario: result.insertId,
            dados: { Nome, TipoUsuario }
        });

    } catch (err) {
        handleError(res, 'Erro ao criar funcionário', err);
    } finally {
        // if (connection) connection.release();
    }
};

// Login funcionário
exports.loginFuncionario = async (req, res) => {
    const { Nome, Senha } = req.body;

    if (!Nome || !Senha) {
        return res.status(400).json({ erro: 'Nome e Senha são obrigatórios' });
    }

    let connection;
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ
        const [results] = await connection.query('SELECT * FROM Funcionario WHERE Nome = ?', [Nome]); // Usa a conexão

        if (results.length === 0) {
            return res.status(401).json({ erro: 'Funcionário não encontrado' });
        }

        const funcionario = results[0];

        const senhaValida = await bcrypt.compare(Senha, funcionario.Senha);

        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // Você provavelmente vai querer retornar um JWT aqui, não o objeto completo do funcionário.
        // O `AuthContext` do frontend espera um `token` e um `user` (objeto do usuário).
        // Adapte esta parte para gerar e retornar um token JWT, e o objeto `user` sem a senha.
        res.json({ sucesso: true, mensagem: 'Login bem-sucedido', user: { idUsuario: funcionario.idUsuario, Nome: funcionario.Nome, TipoUsuario: funcionario.TipoUsuario } });

    } catch (err) {
        handleError(res, 'Erro no login', err);
    } finally {
        // if (connection) connection.release();
    }
};

// Atualizar funcionário por ID
exports.atualizarFuncionario = async (req, res) => {
    const { id } = req.params;
    const { Nome, Senha, TipoUsuario } = req.body;

    if (!Nome || !Senha || !TipoUsuario) {
        return res.status(400).json({
            erro: 'Campos obrigatórios faltando para atualização',
            campos_obrigatorios: ['Nome', 'Senha', 'TipoUsuario']
        });
    }
    if (![1, 2].includes(Number(TipoUsuario))) {
        return res.status(400).json({ erro: 'TipoUsuario inválido. Use 1 (Funcionário) ou 2 (Administrador).' });
    }

    let connection;
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ

        const hashedPassword = await bcrypt.hash(Senha, 10);

        const [result] = await connection.query( // Usa a conexão
            'UPDATE Funcionario SET Nome = ?, Senha = ?, TipoUsuario = ? WHERE idUsuario = ?',
            [Nome, hashedPassword, TipoUsuario, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Funcionário não encontrado' });
        }

        res.json({ sucesso: true, mensagem: 'Funcionário atualizado com sucesso' });

    } catch (err) {
        handleError(res, 'Erro ao atualizar funcionário', err);
    } finally {
        // if (connection) connection.release();
    }
};

// Deletar funcionário por ID
exports.deleteFuncionario = async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await getConnection(); // Obtém a conexão UMA VEZ
        const [result] = await connection.query('DELETE FROM Funcionario WHERE idUsuario = ?', [id]); // Usa a conexão

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Funcionário não encontrado' });
        }

        res.json({ sucesso: true, mensagem: 'Funcionário deletado com sucesso' });

    } catch (err) {
        handleError(res, 'Erro ao deletar funcionário', err);
    } finally {
        // if (connection) connection.release();
    }
};