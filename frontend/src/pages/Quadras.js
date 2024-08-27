import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quadras = () => {
    const [quadras, setQuadras] = useState([]);
    const [novaQuadra, setNovaQuadra] = useState({ nome: '', endereco: '' });

    useEffect(() => {
        // Função para buscar as quadras na API
        const fetchQuadras = async () => {
            try {
                const response = await axios.get('http://localhost:3001/quadras'); // Substitua pela URL da sua API
                setQuadras(response.data);
            } catch (error) {
                console.error('Erro ao buscar quadras:', error);
            }
        };

        fetchQuadras();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovaQuadra({ ...novaQuadra, [name]: value });
    };

    const handleAddQuadra = async () => {
        try {
            const response = await axios.post('http://localhost:3001/quadras', novaQuadra); // Substitua pela URL da sua API
            setQuadras([...quadras, response.data]);
            setNovaQuadra({ nome: '', endereco: '' });
        } catch (error) {
            console.error('Erro ao adicionar quadra:', error);
        }
    };

    const handleDeleteQuadra = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/quadras/${id}`); // Substitua pela URL da sua API
            setQuadras(quadras.filter(quadra => quadra.id !== id));
        } catch (error) {
            console.error('Erro ao deletar quadra:', error);
        }
    };

    return (
        <div>
            <h2>Gerenciar Quadras</h2>
            <div>
                <h3>Adicionar Nova Quadra</h3>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={novaQuadra.nome}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    value={novaQuadra.endereco}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddQuadra}>Adicionar Quadra</button>
            </div>
            <div>
                <h3>Lista de Quadras</h3>
                <ul>
                    {quadras.map(quadra => (
                        <li key={quadra.id}>
                            {quadra.nome} - {quadra.endereco}
                            <button onClick={() => handleDeleteQuadra(quadra.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Quadras;
