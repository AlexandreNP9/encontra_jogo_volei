-- Script para criação das tabelas no banco de dados 'encontra_jogo_volei'
CREATE DATABASE IF NOT EXISTS encontra_jogo_volei;
USE encontra_jogo_volei;

-- Tabela Usuário (autenticação)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Jogadores (dados específicos dos jogadores)
CREATE TABLE jogadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela Quadra (informações sobre as quadras disponíveis)
CREATE TABLE quadras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

-- Tabela Jogos (informações sobre os jogos organizados)
CREATE TABLE jogos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizador_id INT NOT NULL,
    quadra_id INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    data DATE NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    genero ENUM('M', 'F', 'Misto') NOT NULL,
    FOREIGN KEY (organizador_id) REFERENCES jogadores(id) ON DELETE CASCADE,
    FOREIGN KEY (quadra_id) REFERENCES quadras(id) ON DELETE CASCADE
);

-- Tabela Inscrições (relaciona jogadores inscritos nos jogos)
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jogo_id INT NOT NULL,
    jogador_id INT NOT NULL,
    status ENUM('Pendente', 'Aprovado', 'Recusado') DEFAULT 'Pendente',
    FOREIGN KEY (jogo_id) REFERENCES jogos(id) ON DELETE CASCADE,
    FOREIGN KEY (jogador_id) REFERENCES jogadores(id) ON DELETE CASCADE
);
