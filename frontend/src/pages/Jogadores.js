import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const GerenciarJogadores = () => {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState({
        email: '',
        senha: '',
        nome: '',
        data_nascimento: '',
        sexo: '',
    });
    const [jogadorEditando, setJogadorEditando] = useState(null);

    useEffect(() => {
        const fetchJogadores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/jogadores');
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
            const response = await axios.post('http://localhost:3001/jogadores', novoJogador);
            setJogadores([...jogadores, response.data]);
            setNovoJogador({ email: '', senha: '', nome: '', data_nascimento: '', sexo: '' });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar jogador:', error);
        }
    };

    const handleDeleteJogador = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/jogadores/${id}`);
            setJogadores(jogadores.filter(jogador => jogador.id !== id));
        } catch (error) {
            console.error('Erro ao deletar jogador:', error);
        }
    };

    const handleEditJogador = (jogador) => {
        const dataFormatada = jogador.data_nascimento.split('T')[0]; // Formata a data corretamente
        setJogadorEditando(jogador);
        setNovoJogador({ 
            email: jogador.email, 
            senha: jogador.senha, 
            nome: jogador.nome, 
            data_nascimento: dataFormatada, 
            sexo: jogador.sexo 
        });
    };
    

    const handleUpdateJogador = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/jogadores/${jogadorEditando.id}`, novoJogador);
            setJogadores(jogadores.map(jogador => jogador.id === jogadorEditando.id ? { ...jogador, ...response.data } : jogador));
            setJogadorEditando(null);
            setNovoJogador({ email: '', senha: '', nome: '', data_nascimento: '', sexo: '' });
            window.location.reload(); // Recarrega a página após salvar as alterações
        } catch (error) {
            console.error('Erro ao atualizar jogador:', error);
        }
    };
    

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    document.title = "Gerenciar Jogadores";

    return (
        <div className="container">
            <h2>Gerenciar Jogadores</h2>
            <div className="form-group">
                <h3>{jogadorEditando ? 'Editar Jogador' : 'Adicionar Novo Jogador'}</h3>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={novoJogador.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={novoJogador.senha}
                    onChange={handleInputChange}
                />
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
                <select
                    name="sexo"
                    value={novoJogador.sexo}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione o Sexo</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
                {jogadorEditando ? (
                    <button onClick={handleUpdateJogador}>Salvar Alterações</button>
                ) : (
                    <button onClick={handleAddJogador}>Adicionar Jogador</button>
                )}
            </div>
            <div className="table-container">
                <h3>Lista de Jogadores</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Sexo</th>
                            <th>Data de Criação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jogadores.map(jogador => (
                            <tr key={jogador.id}>
                                <td>{jogador.id}</td>
                                <td>{jogador.email}</td>
                                <td>{jogador.senha}</td>
                                <td>{jogador.nome}</td>
                                <td>{formatarData(jogador.data_nascimento)}</td>
                                <td>{jogador.sexo}</td>
                                <td>{formatarData(jogador.data_criacao)}</td>
                                <td>
                                    <button onClick={() => handleEditJogador(jogador)}>Editar</button>
                                    <button onClick={() => handleDeleteJogador(jogador.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GerenciarJogadores;
