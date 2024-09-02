// Criar uma nova inscrição
exports.criarInscricao = (req, res) => {
    const { jogo_id, jogador_id, status } = req.body;

    const query = 'INSERT INTO inscricoes (jogo_id, jogador_id, status) VALUES (?, ?, ?)';
    req.db.query(query, [jogo_id, jogador_id, status || 'Pendente'], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Inscrição criada com sucesso!', inscricaoId: result.insertId });
    });
};

// Obter detalhes de uma inscrição específica
exports.obterInscricao = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM inscricoes WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Inscrição não encontrada' });
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar uma inscrição específica
exports.atualizarInscricao = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE inscricoes SET status = ? WHERE id = ?';
    req.db.query(query, [status, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Inscrição atualizada com sucesso!' });
    });
};

// Deletar uma inscrição específica
exports.deletarInscricao = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM inscricoes WHERE id = ?';
    req.db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Inscrição deletada com sucesso!' });
    });
};

// Obter todas as inscrições
exports.obterTodasInscricoes = (req, res) => {
    const query = 'SELECT * FROM inscricoes';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar inscrições:', err);
            res.status(500).json({ erro: 'Erro ao buscar inscrições' });
        } else {
            res.json(results);
        }
    });
};
