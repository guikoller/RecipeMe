drop database recipeme;

create database recipeme;

use recipeme;

create table categorias(
    id int primary key not null auto_increment,
    nome varchar(100) not null
);

create table usuarios (
  id int primary key not null auto_increment,
  nome varchar(100) not null,
  sobrenome varchar(100) not null,
  login varchar(100) not null unique,
  data_nascimento DATE not null,
  genero varchar(45) not null,
  newsletter tinyint not null,
  senha varchar(100) not null
);

create table medidas(
    id int primary key not null auto_increment,
    nome varchar(100) not null,
    volume decimal(10,2) not null
);

create table ingredientes(
    id int primary key not null auto_increment,
    nome varchar(100) not null unique
);

create table receitas(
    id int primary key not null auto_increment,
    usuario int not null,
    categoria int not null,
    nome varchar(100),
    descricao text not null,
    rendimento decimal(2,1) not null,
    tempo_preparo time not null,
    url_imagem text,
    foreign key (usuario) references usuarios(id),
    foreign key (categoria) references categorias(id)
);

create table ingredientes_receita(
    ingrediente int not null,
    receita int not null,
    medida int not null,
    quantidade decimal(10,2),
    foreign key (ingrediente) references ingredientes(id),
    foreign key (receita) references receitas(id),
    foreign key (medida) references medidas(id)
);

create table comentarios(
    usuario int not null,
    receita int not null,
    data DATE not null,
    avaliacao decimal(1,1),
    texto varchar(350)
);

create table estoque(
    ingrediente int not null,
    usuario int not null,
    medida int not null,
    quantidade decimal(10,2) not null,
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