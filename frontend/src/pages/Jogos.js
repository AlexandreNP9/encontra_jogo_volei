import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const GerenciarJogos = () => {
    const [jogos, setJogos] = useState([]);
    const [jogadores, setJogadores] = useState([]);
    const [quadras, setQuadras] = useState([]);
    const [novoJogo, setNovoJogo] = useState({
        organizador_id: '',
        quadra_id: '',
        nome: '',
        data: '',
        horario_inicio: '',
        horario_fim: '',
        genero: '',
    });
    const [jogoEditando, setJogoEditando] = useState(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const responseJogos = await axios.get('http://localhost:3001/jogos');
                const responseJogadores = await axios.get('http://localhost:3001/jogadores');
                const responseQuadras = await axios.get('http://localhost:3001/quadras');
                setJogos(responseJogos.data);
                setJogadores(responseJogadores.data);
                setQuadras(responseQuadras.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchDados();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovoJogo({ ...novoJogo, [name]: value });
    };

    const handleAddJogo = async () => {
        try {
            const response = await axios.post('http://localhost:3001/jogos', novoJogo);
            setJogos([...jogos, response.data]);
            setNovoJogo({
                organizador_id: '',
                quadra_id: '',
                nome: '',
                data: '',
                horario_inicio: '',
                horario_fim: '',
                genero: '',
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar jogo:', error);
        }
    };

    const handleDeleteJogo = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/jogos/${id}`);
            setJogos(jogos.filter(jogo => jogo.id !== id));
        } catch (error) {
            console.error('Erro ao deletar jogo:', error);
        }
    };

    const handleEditJogo = (jogo) => {
        const dataFormatada = jogo.data.split('T')[0]; // Formata a data corretamente
        setJogoEditando(jogo);
        setNovoJogo({
            organizador_id: jogo.organizador_id,
            quadra_id: jogo.quadra_id,
            nome: jogo.nome,
            data: dataFormatada,
            horario_inicio: jogo.horario_inicio,
            horario_fim: jogo.horario_fim,
            genero: jogo.genero,
        });
    };

    const handleUpdateJogo = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/jogos/${jogoEditando.id}`, novoJogo);
            setJogos(jogos.map(jogo => jogo.id === jogoEditando.id ? { ...jogo, ...response.data } : jogo));
            setJogoEditando(null);
            setNovoJogo({
                organizador_id: '',
                quadra_id: '',
                nome: '',
                data: '',
                horario_inicio: '',
                horario_fim: '',
                genero: '',
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar jogo:', error);
        }
    };

    const getOrganizadorNome = (id) => {
        const jogador = jogadores.find(jogador => jogador.id === id);
        return jogador ? `${id} - ${jogador.nome}` : id;
    };

    const getQuadraNome = (id) => {
        const quadra = quadras.find(quadra => quadra.id === id);
        return quadra ? `${id} - ${quadra.nome}` : id;
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };
    

    document.title = "Gerenciar Jogos";

    return (
        <div className="container">
            <h2>Gerenciar Jogos</h2>
            <div className="form-group">
                <h3>{jogoEditando ? 'Editar Jogo' : 'Adicionar Novo Jogo'}</h3>

                <select
                    name="organizador_id"
                    value={novoJogo.organizador_id}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione o Organizador</option>
                    {jogadores.map(jogador => (
                        <option key={jogador.id} value={jogador.id}>
                            {jogador.id} - {jogador.nome}
                        </option>
                    ))}
                </select>

                <select
                    name="quadra_id"
                    value={novoJogo.quadra_id}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione a Quadra</option>
                    {quadras.map(quadra => (
                        <option key={quadra.id} value={quadra.id}>
                            {quadra.id} - {quadra.nome}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do Jogo"
                    value={novoJogo.nome}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="data"
                    placeholder="Data"
                    value={novoJogo.data}
                    onChange={handleInputChange}
                />
                <input
                    type="time"
                    name="horario_inicio"
                    placeholder="Horário de Início"
                    value={novoJogo.horario_inicio}
                    onChange={handleInputChange}
                />
                <input
                    type="time"
                    name="horario_fim"
                    placeholder="Horário de Fim"
                    value={novoJogo.horario_fim}
                    onChange={handleInputChange}
                />
                <select
                    name="genero"
                    value={novoJogo.genero}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione o Gênero</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="Misto">Misto</option>
                </select>
                {jogoEditando ? (
                    <button onClick={handleUpdateJogo}>Salvar Alterações</button>
                ) : (
                    <button onClick={handleAddJogo}>Adicionar Jogo</button>
                )}
            </div>
            <div className="table-container">
                <h3>Lista de Jogos</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Organizador</th>
                            <th>Quadra</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Início</th>
                            <th>Fim</th>
                            <th>Gênero</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jogos.map(jogo => (
                            <tr key={jogo.id}>
                                <td>{jogo.id}</td>
                                <td>{getOrganizadorNome(jogo.organizador_id)}</td>
                                <td>{getQuadraNome(jogo.quadra_id)}</td>
                                <td>{jogo.nome}</td>
                                <td>{formatarData(jogo.data)}</td>
                                <td>{jogo.horario_inicio}</td>
                                <td>{jogo.horario_fim}</td>
                                <td>{jogo.genero}</td>
                                <td>
                                    <button onClick={() => handleEditJogo(jogo)}>Editar</button>
                                    <button onClick={() => handleDeleteJogo(jogo.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GerenciarJogos;
