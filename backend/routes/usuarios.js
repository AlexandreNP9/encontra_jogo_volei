const express = require('express');
const router = express.Router();
const { criarUsuario, obterUsuario, atualizarUsuario, deletarUsuario } = require('../controllers/usuariosController');

// Rota para criar um novo usuário
router.post('/', criarUsuario);

// Rota para obter detalhes de um usuário específico
router.get('/:id', obterUsuario);

// Rota para atualizar um usuário específico
router.put('/:id', atualizarUsuario);

// Rota para deletar um usuário específico
router.delete('/:id', deletarUsuario);

module.exports = router;