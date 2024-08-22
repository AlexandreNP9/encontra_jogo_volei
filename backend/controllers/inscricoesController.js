const db = require('../config/db');

// Criar uma nova inscrição
exports.criarInscricao = (req, res) => {
    const { jogo_id, jogador_id } = req.body;

    const query = 'INSERT INTO inscricoes (jogo_id, jogador_id) VALUES (?, ?)';
    db.query(query, [jogo_id, jogador_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Inscrição criada com sucesso!', inscricaoId: result.insertId });
    });
};

// Obter todas as inscrições ou filtrar por jogo
exports.obterInscricoes = (req, res) => {
    const { jogo_id } = req.query;

    let query = 'SELECT * FROM inscricoes';
    const params = [];

    if (jogo_id) {
        query += ' WHERE jogo_id = ?';
        params.push(jogo_id);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};

// Atualizar uma inscrição específica
exports.atualizarInscricao = (req, res) => {
    const { id } = req.params;
    const { jogador_id, jogo_id, status } = req.body;

    const query = 'UPDATE inscricoes SET jogador_id = ?, jogo_id = ?, status = ? WHERE id = ?';
    db.query(query, [jogador_id, jogo_id, status, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Inscrição não encontrada' });
        }
        res.status(200).json({ message: 'Inscrição atualizada com sucesso!' });
    });
};

// Deletar uma inscrição específica
exports.deletarInscricao = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM inscricoes WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Inscrição deletada com sucesso!' });
    });
};