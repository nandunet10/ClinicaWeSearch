CREATE DATABASE SistemaSaude;

USE SistemaSaude;

-- Tabela de Pacientes
CREATE TABLE Pacientes (
    Id INT PRIMARY KEY IDENTITY,
    Nome VARCHAR(255) NOT NULL,
    Telefone VARCHAR(20),
    Sexo CHAR(1),
    Email VARCHAR(255) NOT NULL UNIQUE
);

-- Tabela de Atendimentos
CREATE TABLE Atendimentos (
    Id INT PRIMARY KEY IDENTITY,
    NumeroSequencial NVARCHAR(12) NOT NULL,
    PacienteId INT,
    DataHoraChegada DATETIME NOT NULL DEFAULT GETDATE(),
    Status VARCHAR(20) NOT NULL,
    FOREIGN KEY (PacienteId) REFERENCES Pacientes(Id)
);

-- Tabela de Triagens
CREATE TABLE Triagens (
    Id INT PRIMARY KEY IDENTITY,
    AtendimentoId INT,
    Sintomas TEXT,
    PressaoArterial VARCHAR(20),
    Peso DECIMAL(5, 2),
    Altura DECIMAL(4, 2),
    EspecialidadeId INT,
    FOREIGN KEY (AtendimentoId) REFERENCES Atendimentos(Id)
);
