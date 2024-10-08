# Encontra Jogo de Vôlei  
O "Encontra Jogo de Vôlei" é um sistema para ajudar pessoas interessadas em jogar vôlei a encontrar jogos.  

--------------------------------------------------

## Instruções para Rodar os Servidores  
Siga os passos, em ordem.

### Banco de Dados  
Com o MySQL Workbench instalado, abra sua conexão.  
Porta padrão da conexão: 3306  
No MySQL Workbench, execute o script encontra_jogo_volei.mwb para configurar o banco de dados.  
Versão do MySQL Workbench utilizada: 8.0.38  

### Backend  
-> Configuração do Banco de Dados:  
No diretório \encontra_jogo_volei\backend\config\db.js, edite o arquivo de configuração do banco de dados para garantir que as credenciais estejam corretas:  
    host: 'localhost',  
    user: 'root',  
    password: 'root', // Verifique a senha do usuário root  
    database: 'encontra_jogo_volei'  

-> Executar o Backend:  
Com o Node.js instalado, rode o servidor:  
    npm install bcrypt  
    npm install express  
    npm install mysql2  
    npm install cors  
    node index.js  
Porta padrão do Node.js: 3001  
Versão do Node.js utilizada: v20.16.0  

### Frontend  
No diretório encontra_jogo_volei/frontend, instale as dependências do projeto:  
    npm install axios
    npm install  
    npm start  
Porta padrão do React: 3000  
Versão do npm utilizada: 10.8.1  

--------------------------------------------------

## Tecnologias  
FrontEnd: React  
BackEnd: Node.js  
Banco de Dados: MySQL  

## Ferramentas  
Postman: Teste de API  
Visual Studio Code: Editor de código  
GitHub Projects: Gerenciador de tarefas e hospedagem de código  