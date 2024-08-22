const express = require('express');
const mysql = require('mysql2');

const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Conexão com o banco de dados MySQL usando um pool de conexões
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1963',
    database: 'encontra_jogo_volei'
});

// Teste de conexão com o banco de dados
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Encerra o processo se a conexão falhar
    } else {
        console.log('Conectado ao banco de dados MySQL');
        connection.release(); // Libera a conexão de volta para o pool
    }
});

// Middleware para fornecer a conexão do banco de dados nas rotas
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Importação e uso das rotas
const usuariosRoutes = require('./routes/usuarios');
app.use('/usuarios', usuariosRoutes);

// Importação e uso das quadras
const quadrasRoutes = require('./routes/quadras');
app.use('/quadras', quadrasRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});