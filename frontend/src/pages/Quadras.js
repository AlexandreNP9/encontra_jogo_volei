import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const Gerenciamento = () => {
    const [quadras, setQuadras] = useState([]);
    const [novaQuadra, setNovaQuadra] = useState({
        nome: '',
        endereco: ''
    });
    const [quadraEditando, setQuadraEditando] = useState(null);

    useEffect(() => {
        const fetchQuadras = async () => {
            try {
                const response = await axios.get('http://localhost:3001/quadras');
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
            const response = await axios.post('http://localhost:3001/quadras', novaQuadra);
            setQuadras([...quadras, response.data]);
            setNovaQuadra({ nome: '', endereco: '' });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar quadra:', error);
        }
    };

    const handleDeleteQuadra = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/quadras/${id}`);
            setQuadras(quadras.filter(quadra => quadra.id !== id));
        } catch (error) {
            console.error('Erro ao deletar quadra:', error);
        }
    };

    const handleEditQuadra = (quadra) => {
        setQuadraEditando(quadra);
        setNovaQuadra({ nome: quadra.nome, endereco: quadra.endereco });
    };

    const handleUpdateQuadra = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/quadras/${quadraEditando.id}`, novaQuadra);
            setQuadras(quadras.map(quadra => quadra.id === quadraEditando.id ? { ...quadra, ...response.data } : quadra));
            setQuadraEditando(null);
            setNovaQuadra({ nome: '', endereco: '' });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar quadra:', error);
        }
    };

    document.title="Gerenciar QUADRAS";

    return (
        <div className="container">
            <h2>Gerenciar Quadras</h2>
            <div className="form-group">
                <h3>{quadraEditando ? 'Editar Quadra' : 'Adicionar Nova Quadra'}</h3>
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
                {quadraEditando ? (
                    <button onClick={handleUpdateQuadra}>Salvar Alterações</button>
                ) : (
                    <button onClick={handleAddQuadra}>Adicionar Quadra</button>
                )}
            </div>
            <div className="table-container">
                <h3>Lista de Quadras</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quadras.map(quadra => (
                            <tr key={quadra.id}>
                                <td>{quadra.id}</td>
                                <td>{quadra.nome}</td>
                                <td>{quadra.endereco}</td>
                                <td>
                                    <button onClick={() => handleEditQuadra(quadra)}>Editar</button>
                                    <button onClick={() => handleDeleteQuadra(quadra.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Gerenciamento;
