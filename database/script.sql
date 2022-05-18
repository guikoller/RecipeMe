--drop database recipeme;

create database recipeme;

use recipeme;

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
    nome varchar(100),
    descricao text,
    rendimento decimal(2,1),
    tempo_preparo time
);

create table ingrediente_receita(
    ingrediente int,
    receita int,
    medida int,
    quantidade decimal(10,2),
    foreign key (ingrediente) references ingredientes(id),
    foreign key (receita) references receitas(id),
    foreign key (medida) references medidas(id)
);

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

load data local infile 'receita_ingrediente.csv' into table ingrediente_receita
    FIELDS TERMINATED BY ','
    ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS;

