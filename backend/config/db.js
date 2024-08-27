const mysql = require('mysql2');

// Cria um pool de conexões
const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexões no pool
    host: 'localhost',
    user: 'root',
    password: 'root', // Verifique se esta senha está correta
    database: 'encontra_jogo_volei'
});

// Testa a conexão com o banco de dados
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1); // Encerra o processo se a conexão falhar
    } else {
        console.log('Conectado ao banco de dados MySQL');
        connection.release(); // Libera a conexão de volta para o pool
    }
});

module.exports = pool;