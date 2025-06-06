-- Criação do Schema
CREATE DATABASE IF NOT EXISTS `fixwise` DEFAULT CHARACTER SET utf8;
USE `fixwise`;

-- ================================
-- TABELA: Cliente
-- ================================
CREATE TABLE IF NOT EXISTS `Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NOT NULL,
  `CPF_CNPJ` VARCHAR(18) NOT NULL,
  `EmailContato` VARCHAR(100) NULL,
  `TelefoneContato` VARCHAR(20) NULL,
  `Logradouro` VARCHAR(100) NULL,
  `CEP` VARCHAR(10) NULL,
  `Cidade` VARCHAR(50) NULL,
  `Bairro` VARCHAR(50) NULL,
  `Numero` VARCHAR(10) NULL,
  `UF` VARCHAR(2) NULL,
  `Descricao` TEXT NULL,
  `Observacoes` TEXT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB;

-- ================================
-- TABELA: Equipamento
-- ================================
CREATE TABLE IF NOT EXISTS `Equipamento` (
  `idEquipamento` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NULL,
  `Tipo` VARCHAR(50) NULL,
  `Marca` VARCHAR(50) NULL,
  `SerialNumber` VARCHAR(45) NOT NULL,
  `Status` VARCHAR(20) NULL,
  `DataEntrada` DATE NULL,
  `DataSaida` DATE NULL,
  `Descricao` TEXT NULL,
  `Observacoes` TEXT NULL,
  `Cliente_idCliente` INT NOT NULL,
  PRIMARY KEY (`idEquipamento`),
  CONSTRAINT `fk_Equipamento_Cliente`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `Cliente` (`idCliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================
-- TABELA: Funcionario
-- ================================
CREATE TABLE IF NOT EXISTS `Funcionario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NOT NULL,
  `Senha` VARCHAR(100) NOT NULL,
  `TipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB;

-- ================================
-- TABELA: CadastroAcesso
-- ================================
CREATE TABLE IF NOT EXISTS `CadastroAcesso` (
  `idAcesso` INT NOT NULL AUTO_INCREMENT,
  `CPF` VARCHAR(14) NOT NULL,
  `Nome` VARCHAR(100) NOT NULL,
  `Matricula` VARCHAR(20) NOT NULL UNIQUE,
  `NivelAcesso` VARCHAR(20) NOT NULL,
  `Descricao` TEXT,
  `Observacoes` TEXT,
  `Senha` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idAcesso`)
) ENGINE=InnoDB;
-- ================================
-- TABELA: Servico
-- ================================
CREATE TABLE IF NOT EXISTS `Servico` (
  `idServico` INT NOT NULL AUTO_INCREMENT,
  `TipoServico` VARCHAR(100) NULL,
  `DataInicio` DATE NULL,
  `DataFim` DATE NULL,
  `Status` VARCHAR(50) NULL,
  `Setor` VARCHAR(50) NULL,
  PRIMARY KEY (`idServico`)
) ENGINE=InnoDB;

-- ================================
-- TABELA: OrdemServico
-- ================================
CREATE TABLE IF NOT EXISTS `OrdemServico` (
  `idOrdemServico` INT NOT NULL AUTO_INCREMENT,
  `Equipamento_idEquipamento` INT NOT NULL,
  `Servico_idServico` INT NOT NULL,
  PRIMARY KEY (`idOrdemServico`),
  CONSTRAINT `fk_OrdemServico_Equipamento`
    FOREIGN KEY (`Equipamento_idEquipamento`)
    REFERENCES `Equipamento` (`idEquipamento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_OrdemServico_Servico`
    FOREIGN KEY (`Servico_idServico`)
    REFERENCES `Servico` (`idServico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================
-- TABELA: ServicosFuncionario
-- ================================
CREATE TABLE IF NOT EXISTS `ServicosFuncionario` (
  `idServicosFuncionario` INT NOT NULL AUTO_INCREMENT,
  `Funcionario_idUsuario` INT NOT NULL,
  `Servico_idServico` INT NOT NULL,
  PRIMARY KEY (`idServicosFuncionario`),
  CONSTRAINT `fk_ServicosFuncionario_Funcionario`
    FOREIGN KEY (`Funcionario_idUsuario`)
    REFERENCES `Funcionario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ServicosFuncionario_Servico`
    FOREIGN KEY (`Servico_idServico`)
    REFERENCES `Servico` (`idServico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- ================================
-- TABELA: CadastroManutencao
-- ================================
CREATE TABLE IF NOT EXISTS `CadastroManutencao` (
  `idManutencao` INT NOT NULL AUTO_INCREMENT,
  `Equipamento_idEquipamento` INT NOT NULL,
  `DataEntrada` DATE NOT NULL,
  `DataSaida` DATE NULL,
  `ResponsavelManutencao` INT NOT NULL,
  `Status` VARCHAR(50) NOT NULL,
  `Descricao` TEXT NULL,
  `Observacoes` TEXT NULL,
  PRIMARY KEY (`idManutencao`),
  CONSTRAINT `fk_Manutencao_Equipamento`
    FOREIGN KEY (`Equipamento_idEquipamento`)
    REFERENCES `Equipamento` (`idEquipamento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Manutencao_Responsavel`
    FOREIGN KEY (`ResponsavelManutencao`)
    REFERENCES `Funcionario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;