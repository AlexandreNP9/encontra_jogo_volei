import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Jogadores from './pages/Jogadores';
import Quadras from './pages/Quadras';
import Jogos from './pages/Jogos';
import Inscricoes from './pages/Inscricoes';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Jogadores />} />
                <Route path="/quadras" element={<Quadras />} />
                <Route path="/jogos" element={<Jogos />} />
                <Route path="/inscricoes" element={<Inscricoes />} />
                {/* Adicione mais rotas conforme necessário */}
            </Routes>
        </Router>
    );
}

export default App;