const express = require('express');
const router = express.Router();
const { criarQuadra, obterTodasQuadras, obterQuadra, atualizarQuadra, deletarQuadra } = require('../controllers/quadrasController');

// Rota para criar uma nova quadra
router.post('/', criarQuadra);

// Rota para obter todas as quadras
router.get('/', obterTodasQuadras);

// Rota para obter detalhes de uma quadra específica
router.get('/:id', obterQuadra);

// Rota para atualizar uma quadra específica
router.put('/:id', atualizarQuadra);

// Rota para deletar uma quadra específica
router.delete('/:id', deletarQuadra);

module.exports = router;
