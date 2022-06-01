drop database recipeme;

create database recipeme;

use recipeme;

create table categorias(
    id int primary key not null auto_increment,
    nome varchar(100)
);

create table usuarios (
  id int primary key not null auto_increment,
  nome varchar(100),
  sobrenome varchar(100),
  login varchar(100),
  data_nascimento DATE,
  genero varchar(45),
  newsletter tinyint,
  senha varchar(100)
);

create table medidas(
    id int primary key not null auto_increment,
    nome varchar(100),
    volume decimal(10,2)
);

create table ingredientes(
    id int primary key not null auto_increment,
    nome varchar(100)
);

create table receitas(
    id int primary key not null auto_increment,
    usuario int,
    categoria int,
    nome varchar(100),
    descricao text,
    rendimento decimal(2,1),
    tempo_preparo time,
    foreign key (usuario) references usuarios(id),
    foreign key (categoria) references categorias(id)
);

create table ingredientes_receita(
    ingrediente int,
    receita int,
    medida int,
    quantidade decimal(10,2),
    foreign key (ingrediente) references ingredientes(id),
    foreign key (receita) references receitas(id),
    foreign key (medida) references medidas(id)
);

create table comentarios(
    usuario int,
    receita int,
    data DATE,
    avaliacao decimal(1,1),
    texto varchar(350)
);

create table estoque(
    ingrediente int,
    usuario int,
    medida int,
    quantidade decimal(10,2),
    foreign key (ingrediente) references ingredientes(id),
    foreign key (usuario) references usuarios(id),
    foreign key (medida) references medidas(id)
);

load data local infile 'categoria.csv' into table categorias
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'usuarios.csv' into table usuarios
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'medidas.csv' into table medidas
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;


load data local infile 'ingredientes.csv' into table ingredientes
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'receitas.csv' into table receitas
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'receita_ingrediente.csv' into table ingredientes_receita
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'comentarios.csv' into table comentarios
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

load data local infile 'estoque.csv' into table estoque
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;