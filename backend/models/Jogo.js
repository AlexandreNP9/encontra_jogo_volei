const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1963',
    database: 'encontra_jogo_volei'
});

// Função para buscar todos os jogos
function getAllJogos(callback) {
    connection.query('SELECT * FROM jogos', (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

module.exports = {
    getAllJogos,
};