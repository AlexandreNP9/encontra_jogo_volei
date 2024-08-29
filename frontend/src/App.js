import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Usuarios from './pages/Usuarios';
import Jogadores from './pages/Jogadores';
import Quadras from './pages/Quadras';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/jogadores" element={<Jogadores />} />
                <Route path="/quadras" element={<Quadras />} />
                {/* Adicione mais rotas conforme necessário */}
            </Routes>
        </Router>
    );
}

export default App;