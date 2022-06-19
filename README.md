# RecipeMe
## Analise e Projeto de Sistemas - S71
 ### Para executar o projeto, executar os seguintes comandos no terminal:

- Para acessar o console do mysql
```console
Linux:
$ sudo mysql -u root -p
Windows:
mysql -u root -p
```

- Para criar o banco de dados e as tabelas
```console
Linux:
$ sudo mysql --local-infile=1 -u root -p1 < script.sql
Windows:
Get-Content script.sql | mysql --local-infile=1 -u root -p
```

- Caso dê erro sobre arquivos locais:
```console
set global local_infile=1;
```

- Para sair do console do mysql:
```console
quit
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
