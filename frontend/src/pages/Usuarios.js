import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css';

const Gerenciamento = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [novoUsuario, setNovoUsuario] = useState({
        email: '',
        senha: ''
    });
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3001/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovoUsuario({ ...novoUsuario, [name]: value });
    };

    const handleAddUsuario = async () => {
        try {
            const response = await axios.post('http://localhost:3001/usuarios', novoUsuario);
            setUsuarios([...usuarios, { ...response.data, data_criacao: new Date().toISOString() }]);
            setNovoUsuario({ email: '', senha: '' });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    const handleDeleteUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/usuarios/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    const handleEditUsuario = (usuario) => {
        setUsuarioEditando(usuario);
        setNovoUsuario({ email: usuario.email, senha: usuario.senha });
    };

    const handleUpdateUsuario = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/usuarios/${usuarioEditando.id}`, novoUsuario);
            setUsuarios(usuarios.map(usuario => usuario.id === usuarioEditando.id ? { ...usuario, ...response.data } : usuario));
            setUsuarioEditando(null);
            setNovoUsuario({ email: '', senha: '' });
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    document.title="Gerenciar USUÁRIOS";

    return (
        <div className="container">
            <h2>Gerenciar Usuários</h2>
            <div className="form-group">
                <h3>{usuarioEditando ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={novoUsuario.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={novoUsuario.senha}
                    onChange={handleInputChange}
                />
                {usuarioEditando ? (
                    <button onClick={handleUpdateUsuario}>Salvar Alterações</button>
                ) : (
                    <button onClick={handleAddUsuario}>Adicionar Usuário</button>
                )}
            </div>
            <div className="table-container">
                <h3>Lista de Usuários</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Data de Criação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.email}</td>
                                <td>{new Date(usuario.data_criacao).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleEditUsuario(usuario)}>Editar</button>
                                    <button onClick={() => handleDeleteUsuario(usuario.id)}>Excluir</button>
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
