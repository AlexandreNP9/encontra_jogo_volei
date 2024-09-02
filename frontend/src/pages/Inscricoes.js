import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const GerenciarInscricoes = () => {
    const [inscricoes, setInscricoes] = useState([]);
    const [jogos, setJogos] = useState([]);
    const [jogadores, setJogadores] = useState([]);
    const [novaInscricao, setNovaInscricao] = useState({
        jogo_id: '',
        jogador_id: '',
        status: 'Pendente',
    });
    const [inscricaoEditando, setInscricaoEditando] = useState(null);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const responseInscricoes = await axios.get('http://localhost:3001/inscricoes');
                const responseJogos = await axios.get('http://localhost:3001/jogos');
                const responseJogadores = await axios.get('http://localhost:3001/jogadores');
                setInscricoes(responseInscricoes.data);
                setJogos(responseJogos.data);
                setJogadores(responseJogadores.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchDados();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovaInscricao({ ...novaInscricao, [name]: value });
    };

    const handleAddInscricao = async () => {
        try {
            const response = await axios.post('http://localhost:3001/inscricoes', novaInscricao);
            setInscricoes([...inscricoes, response.data]);
            setNovaInscricao({
                jogo_id: '',
                jogador_id: '',
                status: 'Pendente',
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar inscrição:', error);
        }
    };

    const handleDeleteInscricao = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/inscricoes/${id}`);
            setInscricoes(inscricoes.filter(inscricao => inscricao.id !== id));
        } catch (error) {
            console.error('Erro ao deletar inscrição:', error);
        }
    };

    const handleEditInscricao = (inscricao) => {
        setInscricaoEditando(inscricao);
        setNovaInscricao({
            jogo_id: inscricao.jogo_id,
            jogador_id: inscricao.jogador_id,
            status: inscricao.status,
        });
    };

    const handleUpdateInscricao = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/inscricoes/${inscricaoEditando.id}`, novaInscricao);
            setInscricoes(inscricoes.map(inscricao => inscricao.id === inscricaoEditando.id ? { ...inscricao, ...response.data } : inscricao));
            setInscricaoEditando(null);
            setNovaInscricao({
                jogo_id: '',
                jogador_id: '',
                status: 'Pendente',
            });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar inscrição:', error);
        }
    };

    const getJogoNome = (id) => {
        const jogo = jogos.find(jogo => jogo.id === id);
        return jogo ? `${id} - ${jogo.nome}` : id;
    };

    const getJogadorNome = (id) => {
        const jogador = jogadores.find(jogador => jogador.id === id);
        return jogador ? `${id} - ${jogador.nome}` : id;
    };

    document.title = "Gerenciar Inscrições";

    return (
        <div className="container">
            <h2>Gerenciar Inscrições</h2>
            <div className="form-group">
                <h3>{inscricaoEditando ? 'Editar Inscrição' : 'Adicionar Nova Inscrição'}</h3>

                <select
                    name="jogo_id"
                    value={novaInscricao.jogo_id}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione o Jogo</option>
                    {jogos.map(jogo => (
                        <option key={jogo.id} value={jogo.id}>
                            {jogo.id} - {jogo.nome}
                        </option>
                    ))}
                </select>

                <select
                    name="jogador_id"
                    value={novaInscricao.jogador_id}
                    onChange={handleInputChange}
                >
                    <option value="">Selecione o Jogador</option>
                    {jogadores.map(jogador => (
                        <option key={jogador.id} value={jogador.id}>
                            {jogador.id} - {jogador.nome}
                        </option>
                    ))}
                </select>

                <select
                    name="status"
                    value={novaInscricao.status}
                    onChange={handleInputChange}
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Recusado">Recusado</option>
                </select>

                {inscricaoEditando ? (
                    <button onClick={handleUpdateInscricao}>Salvar Alterações</button>
                ) : (
                    <button onClick={handleAddInscricao}>Adicionar Inscrição</button>
                )}
            </div>
            <div className="table-container">
                <h3>Lista de Inscrições</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Jogo</th>
                            <th>Jogador</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inscricoes.map(inscricao => (
                            <tr key={inscricao.id}>
                                <td>{inscricao.id}</td>
                                <td>{getJogoNome(inscricao.jogo_id)}</td>
                                <td>{getJogadorNome(inscricao.jogador_id)}</td>
                                <td>{inscricao.status}</td>
                                <td>
                                    <button onClick={() => handleEditInscricao(inscricao)}>Editar</button>
                                    <button onClick={() => handleDeleteInscricao(inscricao.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GerenciarInscricoes;
