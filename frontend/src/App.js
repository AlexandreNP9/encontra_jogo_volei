// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} /> {/* Rota para a autenticação */}
                <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
                {/* Outras rotas */}
            </Routes>
        </Router>
    );
}

export default App;
