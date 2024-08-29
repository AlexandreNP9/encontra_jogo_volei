// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles.css'; // Certifique-se de que o caminho está correto

// const Quadras = () => {
//     const [quadras, setQuadras] = useState([]);
//     const [novaQuadra, setNovaQuadra] = useState({ nome: '', endereco: '' });
//     const [quadraParaEditar, setQuadraParaEditar] = useState(null);
//     const [quadraEditada, setQuadraEditada] = useState({ nome: '', endereco: '' });

//     const fetchQuadras = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/quadras'); // Substitua pela URL da sua API
//             setQuadras(response.data);
//         } catch (error) {
//             console.error('Erro ao buscar quadras:', error);
//         }
//     };

//     useEffect(() => {
//         fetchQuadras();
//     }, []);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setNovaQuadra({ ...novaQuadra, [name]: value });
//     };

//     const handleEditInputChange = (event) => {
//         const { name, value } = event.target;
//         setQuadraEditada({ ...quadraEditada, [name]: value });
//     };

//     const handleAddQuadra = async () => {
//         try {
//             await axios.post('http://localhost:3001/quadras', novaQuadra); // Substitua pela URL da sua API
//             fetchQuadras(); // Recarregar a lista de quadras
//             setNovaQuadra({ nome: '', endereco: '' });
//         } catch (error) {
//             console.error('Erro ao adicionar quadra:', error);
//         }
//     };

//     const handleDeleteQuadra = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3001/quadras/${id}`); // Substitua pela URL da sua API
//             setQuadras(quadras.filter(quadra => quadra.id !== id));
//         } catch (error) {
//             console.error('Erro ao deletar quadra:', error);
//         }
//     };

//     const handleEditQuadra = async () => {
//         try {
//             await axios.put(`http://localhost:3001/quadras/${quadraParaEditar.id}`, quadraEditada); // Substitua pela URL da sua API
//             fetchQuadras(); // Recarregar a lista de quadras
//             setQuadraParaEditar(null);
//             setQuadraEditada({ nome: '', endereco: '' });
//         } catch (error) {
//             console.error('Erro ao atualizar quadra:', error);
//         }
//     };

//     const handleStartEdit = (quadra) => {
//         setQuadraParaEditar(quadra);
//         setQuadraEditada({ nome: quadra.nome, endereco: quadra.endereco });
//     };

//     return (
//         <div className="quadras-container">
//             <h2 className="quadras-header">Gerenciar Quadras</h2>
//             <div className="quadras-form">
//                 <h3>Adicionar Nova Quadra</h3>
//                 <input
//                     type="text"
//                     name="nome"
//                     placeholder="Nome"
//                     value={novaQuadra.nome}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="text"
//                     name="endereco"
//                     placeholder="Endereço"
//                     value={novaQuadra.endereco}
//                     onChange={handleInputChange}
//                 />
//                 <button onClick={handleAddQuadra}>Adicionar Quadra</button>
//             </div>
//             {quadraParaEditar && (
//                 <div className="quadras-form">
//                     <h3>Editar Quadra</h3>
//                     <input
//                         type="text"
//                         name="nome"
//                         placeholder="Nome"
//                         value={quadraEditada.nome}
//                         onChange={handleEditInputChange}
//                     />
//                     <input
//                         type="text"
//                         name="endereco"
//                         placeholder="Endereço"
//                         value={quadraEditada.endereco}
//                         onChange={handleEditInputChange}
//                     />
//                     <button onClick={handleEditQuadra}>Salvar Alterações</button>
//                     <button onClick={() => setQuadraParaEditar(null)}>Cancelar</button>
//                 </div>
//             )}
//             <div>
//                 <h3>Lista de Quadras</h3>
//                 <table className="quadras-table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Nome</th>
//                             <th>Endereço</th>
//                             <th>Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {quadras.map(quadra => (
//                             <tr key={quadra.id}>
//                                 <td>{quadra.id}</td>
//                                 <td>{quadra.nome}</td>
//                                 <td>{quadra.endereco}</td>
//                                 <td>
//                                     <button onClick={() => handleStartEdit(quadra)}>Editar</button>
//                                     <button onClick={() => handleDeleteQuadra(quadra.id)}>Excluir</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Quadras;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Certifique-se de que o caminho está correto

const Quadras = () => {
    const [quadras, setQuadras] = useState([]);
    const [novaQuadra, setNovaQuadra] = useState({ nome: '', endereco: '' });
    const [quadraParaEditar, setQuadraParaEditar] = useState(null);
    const [quadraEditada, setQuadraEditada] = useState({ nome: '', endereco: '' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchQuadras = async () => {
        try {
            const response = await axios.get('http://localhost:3001/quadras'); // Substitua pela URL da sua API
            setQuadras(response.data);
        } catch (error) {
            console.error('Erro ao buscar quadras:', error);
        }
    };

    useEffect(() => {
        fetchQuadras();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNovaQuadra({ ...novaQuadra, [name]: value });
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setQuadraEditada({ ...quadraEditada, [name]: value });
    };

    const handleAddQuadra = async () => {
        try {
            await axios.post('http://localhost:3001/quadras', novaQuadra); // Substitua pela URL da sua API
            fetchQuadras(); // Recarregar a lista de quadras
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

    const handleEditQuadra = async () => {
        try {
            await axios.put(`http://localhost:3001/quadras/${quadraParaEditar.id}`, quadraEditada); // Substitua pela URL da sua API
            fetchQuadras(); // Recarregar a lista de quadras
            setQuadraParaEditar(null);
            setQuadraEditada({ nome: '', endereco: '' });
            setIsEditing(false); // Finalizar edição
        } catch (error) {
            console.error('Erro ao atualizar quadra:', error);
        }
    };

    const handleStartEdit = (quadra) => {
        setQuadraParaEditar(quadra);
        setQuadraEditada({ nome: quadra.nome, endereco: quadra.endereco });
        setIsEditing(true); // Iniciar edição
    };

    const handleCancelEdit = () => {
        setQuadraParaEditar(null);
        setQuadraEditada({ nome: '', endereco: '' });
        setIsEditing(false); // Cancelar edição
    };

    return (
        <div className="quadras-container">
            <h2 className="quadras-header">Gerenciar Quadras</h2>
            {!isEditing && (
                <div className="quadras-form">
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
            )}
            {quadraParaEditar && (
                <div className="quadras-form">
                    <h3>Editar Quadra</h3>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome"
                        value={quadraEditada.nome}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="endereco"
                        placeholder="Endereço"
                        value={quadraEditada.endereco}
                        onChange={handleEditInputChange}
                    />
                    <button onClick={handleEditQuadra}>Salvar Alterações</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
            )}
            <div>
                <h3>Lista de Quadras</h3>
                <table className="quadras-table">
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
                                    <button onClick={() => handleStartEdit(quadra)}>Editar</button>
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

export default Quadras;
