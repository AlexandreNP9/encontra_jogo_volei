const express = require('express');
const cors = require('cors'); // Importa o pacote cors
const db = require('./config/db'); // Importa o pool de conexões do arquivo db.js

const app = express();

// Middleware para habilitar o CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

// Middleware para fornecer a conexão do banco de dados nas rotas
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Importação e uso das rotas
const jogadoresRoutes = require('./routes/jogadores');
const quadrasRoutes = require('./routes/quadras');
const jogosRoutes = require('./routes/jogos');
const inscricoesRoutes = require('./routes/inscricoes');

app.use('/jogadores', jogadoresRoutes);
app.use('/quadras', quadrasRoutes);
app.use('/jogos', jogosRoutes);
app.use('/inscricoes', inscricoesRoutes);


// Porta do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});