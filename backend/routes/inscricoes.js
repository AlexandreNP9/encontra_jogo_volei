const express = require('express');
const router = express.Router();
const { criarInscricao, obterInscricoes, atualizarInscricao, deletarInscricao } = require('../controllers/inscricoesController');

// Rota para criar uma nova inscrição
router.post('/', criarInscricao);

// Rota para obter todas as inscrições ou filtrar por jogo
router.get('/', obterInscricoes);

// Rota para atualizar uma inscrição específica
router.put('/:id', atualizarInscricao);

// Rota para deletar uma inscrição específica
router.delete('/:id', deletarInscricao);

module.exports = router;