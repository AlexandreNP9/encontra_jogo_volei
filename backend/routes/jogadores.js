const express = require('express');
const router = express.Router();
const { criarJogador, obterTodosJogadores, obterJogador, atualizarJogador, deletarJogador } = require('../controllers/jogadoresController');

// Rota para criar um novo jogador
router.post('/', criarJogador);

// Rota para obter todos os jogadores
router.get('/', obterTodosJogadores);

// Rota para obter detalhes de um jogador específico
router.get('/:id', obterJogador);

// Rota para atualizar um jogador específico
router.put('/:id', atualizarJogador);

// Rota para deletar um jogador específico
router.delete('/:id', deletarJogador);

module.exports = router;
