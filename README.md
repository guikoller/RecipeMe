# RecipeMe
## Analise e Projeto de Sistemas - S71
 ### Para executar o projeto, executar os seguintes comandos no terminal:

- Para criar o banco de dados e as tabelas
```console
$ sudo mysql --local-infile=1 -u root -p1 < script.sql
```

- Para instalar o npm:
```console
$ sudo apt update
$ sudo apt install npm
```
- Para instalar as dependências do projeto e executar o servidor:
```console
$ cd server
$ npm install
$ node index.js
```
- Para executar o cliente:
```console
$ cd client
$ npm run serve
```
 - Abrir no navegador:
```browse
http://localhost:8080/
```
- Usuário Padrão
```
login: teste
senha: teste
```
