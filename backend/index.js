const express = require('express');
const app = express();
const jogosRouter = require('./routes/jogos');

app.use(express.json()); // Para analisar JSON
app.use('/api/jogos', jogosRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});