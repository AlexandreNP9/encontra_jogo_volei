import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Jogadores from './pages/Jogadores';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jogadores" element={<Jogadores />} />
                {/* Adicione mais rotas conforme necessário */}
            </Routes>
        </Router>
    );
}

export default App;