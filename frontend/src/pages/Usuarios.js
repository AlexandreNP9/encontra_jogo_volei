import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [novoUsuario, setNovoUsuario] = useState({
        email: '',
        senha: '',
        data_nascimento: '',
    });
    
    useEffect(() => {
        // Função para buscar as usuarios na API
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3001/usuarios'); // Substitua pela URL da sua API
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuarios:', error);
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
            const response = await axios.post('http://localhost:3001/usuarios', novoUsuario); // Substitua pela URL da sua API
            setUsuarios([...usuarios, response.data]);
            setNovUsuario({ email: '', senha: '' });
        } catch (error) {
            console.error('Erro ao adicionar usuario:', error);
        }
    };

    const handleDeleteUsuario = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/usuarios/${id}`); // Substitua pela URL da sua API
            setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } catch (error) {
            console.error('Erro ao deletar usuario:', error);
        }
    };

    return (
        <div>
            <h2>Gerenciar Usuarios</h2>
            <div>
                <h3>Adicionar Novo Usuario</h3>
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
                <button onClick={handleAddUsuario}>Adicionar Usuário</button>
            </div>
            <div>
                <h3>Lista de Usuarios</h3>
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.id}>
                            {usuario.email} - {usuario.senha} - {usuario.data_criacao}
                            <button onClick={() => handleDeleteUsuario(usuario.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Usuarios;
