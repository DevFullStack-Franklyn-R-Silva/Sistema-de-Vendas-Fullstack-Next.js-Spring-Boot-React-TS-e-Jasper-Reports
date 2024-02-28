CREATE DATABASE vendas;

CREATE TABLE produto (
    id bigserial NOT NULL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    descricao varchar(255),
    preco numeric(16,2),
    sku varchar(20),
    data_cadastro date
);

CREATE TABLE cliente (
    id bigserial NOT NULL PRIMARY KEY,
    nascimento date NOT NULL,
    nome varchar(100) NOT NULL,
    endereco varchar(255) NOT NULL,
    cpf varchar(14) NOT NULL,
    telefone varchar(14),
    email varchar(100),
    data_cadastro date
);

CREATE TABLE venda (
    id bigserial NOT NULL PRIMARY KEY,
    id_cliente bigint REFERENCES cliente (id) NOT NULL,
    forma_pagamento varchar(8) CHECK (forma_pagamento IN ('DINHEIRO', 'PIX', 'CARTAO')) NOT NULL,
    total numeric(16,2) NOT NULL
);

CREATE TABLE item_venda (
    id bigserial NOT NULL PRIMARY KEY,
    id_venda bigint REFERENCES venda (id) NOT NULL,
    id_produto bigint REFERENCES produto (id) NOT NULL,
    quantidade integer NOT NULL
);
