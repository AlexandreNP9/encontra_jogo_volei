// Criar um novo jogador
exports.criarJogador = (req, res) => {
    const { nome, data_nascimento, sexo } = req.body;

    const query = 'INSERT INTO jogadores (email, senha, nome, data_nascimento, sexo, data_criacao) VALUES (?, ?, ?, ?, ?, ?)';
    req.db.query(query, [email, senha, nome, data_nascimento, sexo, data_criacao], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Jogador criado com sucesso!', jogadorId: result.insertId });
    });
};

// Obter detalhes de um jogador específico
exports.obterJogador = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM jogadores WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Jogador não encontrado' });
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar um jogador específico
exports.atualizarJogador = (req, res) => {
    const { id } = req.params;
    const { email, senha, nome, data_nascimento, sexo, data_criacao } = req.body;

    const query = 'UPDATE jogadores SET email = ?, senha = ?, nome = ?, data_nascimento = ?, sexo = ?, data_criacao = ? WHERE id = ?';
    req.db.query(query, [email, senha, nome, data_nascimento, sexo, data_criacao, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogador atualizado com sucesso!' });
    });
};

// Deletar um jogador específico
exports.deletarJogador = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM jogadores WHERE id = ?';
    req.db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogador deletado com sucesso!' });
    });
};

// Obter todos os jogadores
exports.obterTodosJogadores = (req, res) => {
    const query = 'SELECT * FROM jogadores';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar jogadores:', err);
            res.status(500).json({ erro: 'Erro ao buscar jogadores' });
        } else {
            res.json(results);
        }
    });
};
