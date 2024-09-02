const express = require('express');
const router = express.Router();
const { criarJogo, obterTodosJogos, obterJogo, atualizarJogo, deletarJogo } = require('../controllers/jogosController');

// Rota para criar um novo jogo
router.post('/', criarJogo);

// Rota para obter todos os jogos ou filtrar por organizador
router.get('/', obterTodosJogos);

// Rota para obter detalhes de um jogo específico
router.get('/:id', obterJogo);

// Rota para atualizar um jogo específico
router.put('/:id', atualizarJogo);

// Rota para deletar um jogo específico
router.delete('/:id', deletarJogo);

module.exports = router;
