# Encontra Jogo de Vôlei  
O "Encontra Jogo de Vôlei" é um sistema para ajudar pessoas interessadas em jogar vôlei a encontrar jogos.  

--------------------------------------------------

## Instruções para Rodar os Servidores  
### Autenticação  
-> Configurar o Vite e Clerk:  
Navegue até o diretório /frontend.  
Instale o Vite para rodar o Clerk:  
    npm create vite@latest clerk-react -- --template react-ts  
    cd clerk-react  
    npm install  
    npm run dev  
Deixe o servidor rodando.  
Versão do Vite utilizada: v5.4.2  
Porta padrão do Vite: 5173  

-> Instalar o Clerk e React Router:  
Em outro terminal, ainda no diretório /frontend, instale o Clerk e o React Router:  
    npm install @clerk/clerk-react  
    npm install react-router-dom  

### Frontend  
No diretório encontra_jogo_volei/frontend, instale as dependências do projeto:  
    npm install  
    npm start  
Porta padrão do React: 3000  
Versão do npm utilizada: 10.8.1  

### Banco de Dados  
Com o MySQL Workbench instalado, abra sua conexão.  
Porta padrão da conexão: 3306  
No MySQL Workbench, execute o script encontra_jogo_volei.mwb para configurar o banco de dados.  
Versão do MySQL Workbench utilizada: 8.0.38  

### Backend  
-> Configuração do Banco de Dados:  
No diretório encontra_jogo_volei/backend, edite o arquivo de configuração do banco de dados para garantir que as credenciais estejam corretas:  
    host: 'localhost',  
    user: 'root',  
    password: 'root', // Verifique a senha do usuário root  
    database: 'encontra_jogo_volei'  

-> Executar o Backend:  
Com o Node.js instalado, rode o servidor:  
    node index.js  
Porta padrão do Node.js: 3001  
Versão do Node.js utilizada: v20.16.0  

--------------------------------------------------

## Especificações do Projeto  
Para mais detalhes sobre o projeto, acesse: Especificações  

--------------------------------------------------

## Tecnologias  
FrontEnd: React  
BackEnd: Node.js  
Banco de Dados: MySQL  

## Ferramentas  
Postman: Teste de API  
Visual Studio Code: Editor de código  
GitHub Projects: Gerenciador de tarefas e hospedagem de código  

## Frameworks  
Clerk: Autenticação  
Vite: Instalador do Clerk  