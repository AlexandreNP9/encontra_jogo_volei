// Criar um novo usuário
exports.criarUsuario = (req, res) => {
    const { email, senha } = req.body;

    const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
    req.db.query(query, [email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario criado com sucesso!', usuarioId: result.insertId });
    });
};

// Obter detalhes de um usuário específico
exports.obterUsuario = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM usuarios WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar um usuário específico
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

    const query = 'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?';
    req.db.query(query, [email, senha, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    });
};

// Deletar um usuário específico
exports.deletarUsuario = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM usuarios WHERE id = ?';
    req.db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Usuários deletado com sucesso!' });
    });
};

// Obter todos os usuários
exports.obterTodosUsuarios = (req, res) => {
    const query = 'SELECT * FROM usuarios';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ erro: 'Erro ao buscar usuários' });
        } else {
            res.json(results);
        }
    });
};
