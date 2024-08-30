import React from 'react';

const Home = () => {
    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h1>Encontra Jogo de Vôlei</h1>
                <p>Selecione uma das opções abaixo para gerenciar:</p>
                <ul>
                    <li><a href="/quadras">Gerenciar Quadras</a></li>
                    <li><a href="/jogadores">Gerenciar Jogadores</a></li>
                    <li><a href="/jogos">Gerenciar Jogos</a></li>
                    <li><a href="/inscricoes">Gerenciar Inscrições</a></li>
                </ul>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    box: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    }
};

export default Home;
