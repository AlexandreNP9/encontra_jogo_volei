// Criar um novo jogo
exports.criarJogo = (req, res) => {
    const { organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero } = req.body;

    const query = 'INSERT INTO jogos (organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero) VALUES (?, ?, ?, ?, ?, ?, ?)';
    req.db.query(query, [organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Jogo criado com sucesso!', jogoId: result.insertId });
    });
};

// Obter detalhes de um jogo específico
exports.obterJogo = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM jogos WHERE id = ?'; // Corrigido para 'jogos'
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Jogo não encontrado' }); // Corrigido para 'Jogo não encontrado'
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar um jogo específico
exports.atualizarJogo = (req, res) => {
    const { id } = req.params;
    const { organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero } = req.body;

    const query = 'UPDATE jogos SET organizador_id = ?, quadra_id = ?, nome = ?, data = ?, horario_inicio = ?, horario_fim = ?, genero = ? WHERE id = ?';
    req.db.query(query, [organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogo atualizado com sucesso!' });
    });
};

// Deletar um jogo específico
exports.deletarJogo = (req, res) => {
    const { id } = req.params;

    req.db.query('DELETE FROM jogos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogo deletado com sucesso!' });
    });
};

// Obter todos os jogos
exports.obterTodosJogos = (req, res) => {
    const query = 'SELECT * FROM jogos';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar jogos:', err);
            res.status(500).json({ erro: 'Erro ao buscar jogos' });
        } else {
            res.json(results);
        }
    });
};
