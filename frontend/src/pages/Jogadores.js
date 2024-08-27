import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Jogadores = () => {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState({ nome: '', data_nascimento: '', sexo: '' });

    useEffect(() => {
        // Função para buscar os jogadores na API
        const fetchJogadores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/jogadores'); // Substitua pela URL da sua API
                setJogadores(response.data);
            } catch (error) {
                console.error('Erro ao buscar jogadores:', error);
            }
        };

        fetchJogadores();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovoJogador({ ...novoJogador, [name]: value });
    };

    const handleAddJogador = async () => {
        try {
            const response = await axios.post('http://localhost:3001/jogadores', novoJogador); // Substitua pela URL da sua API
            setJogadores([...jogadores, response.data]);
            setNovoJogador({ nome: '', data_nascimento: '', sexo: '' });
        } catch (error) {
            console.error('Erro ao adicionar jogador:', error);
        }
    };

    const handleDeleteJogador = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/jogadores/${id}`); // Substitua pela URL da sua API
            setJogadores(jogadores.filter(jogador => jogador.id !== id));
        } catch (error) {
            console.error('Erro ao deletar jogador:', error);
        }
    };

    return (
        <div>
            <h2>Gerenciar Jogadores</h2>
            <div>
                <h3>Adicionar Novo Jogador</h3>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={novoJogador.nome}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="data_nascimento"
                    placeholder="Data de Nascimento"
                    value={novoJogador.data_nascimento}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="sexo"
                    placeholder="Sexo"
                    value={novoJogador.sexo}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddJogador}>Adicionar Jogador</button>
            </div>
            <div>
                <h3>Lista de Jogadores</h3>
                <ul>
                    {jogadores.map(jogador => (
                        <li key={jogador.id}>
                            {jogador.nome} - {jogador.data_nascimento} - {jogador.sexo}
                            <button onClick={() => handleDeleteJogador(jogador.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Jogadores;
