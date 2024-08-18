//teste do servidor
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Encontra Jogo de Vôlei Backend');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//configuração da conexão ao banco de dados
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1963',
    database: 'encontra_jogo_volei'
});

//teste da conexão
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

// integrando a Rota ao Servidor Principal
const jogosRouter = require('./routers/jogos');

app.use(express.json()); // Para analisar JSON
app.use('/api/jogos', jogosRouter);

