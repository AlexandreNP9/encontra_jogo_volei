import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Jogadores() {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState({
        nome: '',
        data_nascimento: '',
        sexo: ''
    });
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        fetchJogadores();
    }, []);

    const fetchJogadores = async () => {
        try {
            const response = await axios.get('http://localhost:3001/jogadores');
            setJogadores(response.data);
        } catch (error) {
            console.error('Erro ao buscar jogadores:', error);
        }
    };

    const createJogador = async () => {
        try {
            await axios.post('http://localhost:3001/jogadores', novoJogador);
            setMensagem('Jogador criado com sucesso!');
            fetchJogadores();
        } catch (error) {
            console.error('Erro ao criar jogador:', error);
            setMensagem('Erro ao criar jogador.');
        }
    };

    return (
        <div>
            <h2>Gerenciar Jogadores</h2>
            {mensagem && <p>{mensagem}</p>}
            <ul>
                {jogadores.map(jogador => (
                    <li key={jogador.id}>
                        {jogador.nome} - {jogador.data_nascimento} - {jogador.sexo}
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="Nome do Jogador" 
                value={novoJogador.nome} 
                onChange={e => setNovoJogador({ ...novoJogador, nome: e.target.value })} 
            />
            <input 
                type="date" 
                placeholder="Data de Nascimento" 
                value={novoJogador.data_nascimento} 
                onChange={e => setNovoJogador({ ...novoJogador, data_nascimento: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Sexo" 
                value={novoJogador.sexo} 
                onChange={e => setNovoJogador({ ...novoJogador, sexo: e.target.value })} 
            />
            <button onClick={createJogador}>Criar Jogador</button>
        </div>
    );
}

export default Jogadores;
