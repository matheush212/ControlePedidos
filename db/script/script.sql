/*
Created: 28/10/2019
Modified: 28/10/2019
Model: cep_model
Database: SQLite 3.7
*/


-- Create tables section -------------------------------------------------

-- Table Usuario

CREATE TABLE Usuario
(
  ID INTEGER NOT NULL
        CONSTRAINT PK_Usuario PRIMARY KEY AUTOINCREMENT,
  Nome TEXT NOT NULL,
  Login TEXT NOT NULL,
  Senha TEXT NOT NULL,
  CONSTRAINT ID UNIQUE (ID)
);

-- Table CEP

CREATE TABLE CEP
(
  ID INTEGER NOT NULL
        CONSTRAINT PK_CEP PRIMARY KEY AUTOINCREMENT,
  Fornecedor TEXT NOT NULL,
  NumeroPedido int NOT NULL,
  DataEnvio datetime NOT NULL,
  DataPrevistaEntrega datetime NOT NULL,
  DataRealEntrega datetime,
  Data datetime NOT NULL,
  InformacoesAdicionais TEXT,
  StatusEntrega TEXT NOT NULL,
  IDUsuario INTEGER,
  CONSTRAINT ID UNIQUE (ID),
  CONSTRAINT Relationship3 FOREIGN KEY (IDUsuario) REFERENCES Usuario (ID)
);

CREATE INDEX IX_Relationship3 ON CEP (IDUsuario);

