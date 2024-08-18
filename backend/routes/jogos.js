const express = require('express');
const router = express.Router();
const { getAllJogos } = require('../models/Jogo');

// Rota para listar todos os jogos
router.get('/', (req, res) => {
    getAllJogos((err, jogos) => {
        if (err) return res.status(500).send(err);
        res.json(jogos);
    });
});

// Rota para criar um novo jogo
router.post('/', (req, res) => {
    // Lógica para criar um jogo
    res.send('Jogo criado');
});

module.exports = router;