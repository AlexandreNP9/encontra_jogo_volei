const db = require('../config/db');

// Criar um novo usuário e jogador associado
exports.criarUsuario = (req, res) => {
    const { email, senha, nome, data_nascimento, sexo } = req.body;

    db.query('INSERT INTO usuarios (email, senha) VALUES (?, ?)', [email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const usuarioId = result.insertId;

        db.query('INSERT INTO jogadores (usuario_id, nome, data_nascimento, sexo) VALUES (?, ?, ?, ?)',
            [usuarioId, nome, data_nascimento, sexo],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Usuário e Jogador criados com sucesso!', usuarioId });
            }
        );
    });
};

// Obter detalhes de um usuário específico (incluindo jogador)
exports.obterUsuario = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT u.id, u.email, u.data_criacao, j.nome, j.data_nascimento, j.sexo 
        FROM usuarios u 
        JOIN jogadores j ON u.id = j.usuario_id 
        WHERE u.id = ?
    `;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result[0]);
    });
};

// Atualizar um usuário específico (e o jogador associado)
exports.atualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { email, senha, nome, data_nascimento, sexo } = req.body;

    const queryUsuario = 'UPDATE usuarios SET email = ?, senha = ? WHERE id = ?';
    const queryJogador = 'UPDATE jogadores SET nome = ?, data_nascimento = ?, sexo = ? WHERE usuario_id = ?';

    db.query(queryUsuario, [email, senha, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query(queryJogador, [nome, data_nascimento, sexo, id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Usuário e Jogador atualizados com sucesso!' });
        });
    });
};

// Deletar um usuário específico (e o jogador associado)
exports.deletarUsuario = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM jogadores WHERE usuario_id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário e Jogador deletados com sucesso!' });
        });
    });
};