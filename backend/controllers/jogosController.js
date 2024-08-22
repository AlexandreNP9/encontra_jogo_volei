const db = require('../config/db');

// Criar um novo jogo
exports.criarJogo = (req, res) => {
    const { organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero } = req.body;

    const query = 'INSERT INTO jogos (organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Jogo criado com sucesso!', jogoId: result.insertId });
    });
};

// Obter todos os jogos ou filtrar por organizador
exports.obterJogos = (req, res) => {
    const { organizador_id } = req.query;

    let query = 'SELECT * FROM jogos';
    const params = [];

    if (organizador_id) {
        query += ' WHERE organizador_id = ?';
        params.push(organizador_id);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(result);
    });
};


// Atualizar um jogo específico
exports.atualizarJogo = (req, res) => {
    const { id } = req.params;
    const { organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero } = req.body;

    const query = 'UPDATE jogos SET organizador_id = ?, quadra_id = ?, nome = ?, data = ?, horario_inicio = ?, horario_fim = ?, genero = ? WHERE id = ?';
    db.query(query, [organizador_id, quadra_id, nome, data, horario_inicio, horario_fim, genero, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogo atualizado com sucesso!' });
    });
};

// Deletar um jogo específico
exports.deletarJogo = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM jogos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Jogo deletado com sucesso!' });
    });
};
