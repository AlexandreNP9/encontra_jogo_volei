import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Jogadores from './pages/Jogadores';
import Quadras from './pages/Quadras';
import Jogos from './pages/Jogos';
import Inscricoes from './pages/Inscricoes';

const PrivateRoute = ({ element: Component }) => {
    const token = localStorage.getItem('token');
    return token ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute element={Home} />} />
                <Route path="/jogadores" element={<PrivateRoute element={Jogadores} />} />
                <Route path="/quadras" element={<PrivateRoute element={Quadras} />} />
                <Route path="/jogos" element={<PrivateRoute element={Jogos} />} />
                <Route path="/inscricoes" element={<PrivateRoute element={Inscricoes} />} />
            </Routes>
        </Router>
    );
};

export default App;
