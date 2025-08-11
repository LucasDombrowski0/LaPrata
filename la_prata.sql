CREATE TABLE linha_ameixas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO linha_ameixas (nome, preco, estoque)
VALUES 
  ('Sabonete Grande com Bucha', 12.50, 10),
  ('Sabonete Grande sem Bucha', 12.00, 10),
  ('Sabonete Pequeno', 5.00, 10),
  ('Sal de Banho', 10.00, 10);


CREATE TABLE linha_memories (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO linha_memories (nome, preco, estoque)
VALUES 
  ('Sabonete Grande com Bucha', 12.50, 10),
  ('Sabonete Grande sem Bucha', 12.00, 10),
  ('Sabonete Pequeno', 5.00, 10),
  ('Sal de Banho', 10.00, 10);


CREATE TABLE linha_infantil (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO linha_infantil (nome, preco, estoque)
VALUES 
  ('Donal e Margarida', 9.00, 10);



CREATE TABLE linha_potes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO linha_potes (nome, preco, estoque)
VALUES 
  ('Pote Decorado Azul', 15.00, 10),
  ('Pote Decorado Rosa', 14.00, 10);