// Criar uma nova quadra
exports.criarQuadra = (req, res) => {
    const { nome, endereco } = req.body;

    const query = 'INSERT INTO quadras (nome, endereco) VALUES (?, ?)';
    req.db.query(query, [nome, endereco], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Quadra criada com sucesso!', quadraId: result.insertId });
    });
};

// Obter detalhes de uma quadra específica
exports.obterQuadra = (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM quadras WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Quadra não encontrada' });
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar uma quadra específica
exports.atualizarQuadra = (req, res) => {
    const { id } = req.params;
    const { nome, endereco } = req.body;

    const query = 'UPDATE quadras SET nome = ?, endereco = ? WHERE id = ?';
    req.db.query(query, [nome, endereco, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Quadra atualizada com sucesso!' });
    });
};

// Deletar uma quadra específica
exports.deletarQuadra = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM quadras WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Quadra deletada com sucesso!' });
    });
};

// Obter todas as quadras
exports.obterTodasQuadras = (req, res) => {
    const query = 'SELECT * FROM quadras';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar quadras:', err);
            res.status(500).json({ erro: 'Erro ao buscar quadras' });
        } else {
            res.json(results);
        }
    });
};
