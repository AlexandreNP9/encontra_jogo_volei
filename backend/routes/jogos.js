const express = require('express');
const router = express.Router();

// Rota para listar todos os jogos
router.get('/', (req, res) => {
    // Lógica para buscar jogos no banco de dados
    res.send('Listando todos os jogos');
});

// Rota para criar um novo jogo
router.post('/', (req, res) => {
    // Lógica para criar um jogo
    res.send('Jogo criado');
});

module.exports = router;