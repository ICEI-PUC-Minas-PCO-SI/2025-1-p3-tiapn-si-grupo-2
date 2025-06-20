-- Criação do Schema
CREATE DATABASE IF NOT EXISTS `fixwise` DEFAULT CHARACTER SET utf8;
USE `fixwise`;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fixwise
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fixwise
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `fixwise` DEFAULT CHARACTER SET utf8 ;
USE `fixwise` ;

-- -----------------------------------------------------
-- Table `fixwise`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `CPF_CNPJ` VARCHAR(14) NOT NULL,
  `EmailContato` VARCHAR(45) NULL,
  `TelefoneContato` VARCHAR(15) NULL,
  `Logradouro` VARCHAR(45) NULL,
  `CEP` VARCHAR(9) NULL,
  `Cidade` VARCHAR(45) NULL,
  `Bairro` VARCHAR(45) NULL,
  `Numero` INT NULL,
  `UF` VARCHAR(2) NULL,
  `Complemento` VARCHAR(40);
  `Descricao` TEXT NULL,
  `Observacoes` TEXT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table `fixwise`.`Equipamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`Equipamento` (
  `idEquipamento` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NULL,
  `Descricao` VARCHAR(45) NULL,
  `Status` VARCHAR(10) NULL,
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

-- -----------------------------------------------------
-- Table `fixwise`.`Funcionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`Funcionario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(45) NOT NULL,
  `Senha` VARCHAR(45) NOT NULL,
  `TipoUsuario` INT NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fixwise`.`Servico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`Servico` (
  `idServico` INT NOT NULL AUTO_INCREMENT,
  `TipoServico` VARCHAR(45) NULL,
  `DataInicio` DATE NULL,
  `DataFim` DATE NULL,
  `Status` VARCHAR(50) NULL,
  `Setor` VARCHAR(50) NULL,
  PRIMARY KEY (`idServico`)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table `fixwise`.`OrdemServico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`OrdemServico` (
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


-- -----------------------------------------------------
-- Table `fixwise`.`ServicosFuncionario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fixwise`.`ServicosFuncionario` (
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