const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Verifique a senha do usuário root
    database: 'encontra_jogo_volei'
});
