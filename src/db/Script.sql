
--
-- Table structure for table `cadastroacesso`
--

CREATE SCHEMA fixwise;
use fixwise;

CREATE TABLE `cadastroacesso` (
  `idAcesso` int(11) NOT NULL AUTO_INCREMENT,
  `CPF` varchar(14) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Matricula` varchar(20) NOT NULL,
  `NivelAcesso` varchar(20) NOT NULL,
  `Descricao` text DEFAULT NULL,
  `Observacoes` text DEFAULT NULL,
  `Senha` varchar(60) NOT NULL,
  PRIMARY KEY (`idAcesso`),
  UNIQUE KEY `Matricula` (`Matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Table structure for table `cadastromanutencao`
--

CREATE TABLE `cadastromanutencao` (
  `idManutencao` int(11) NOT NULL AUTO_INCREMENT,
  `Equipamento_idEquipamento` int(11) NOT NULL,
  `DataEntrada` date NOT NULL,
  `DataSaida` date DEFAULT NULL,
  `ResponsavelManutencao` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `Descricao` text DEFAULT NULL,
  `Observacoes` text DEFAULT NULL,
  PRIMARY KEY (`idManutencao`),
  KEY `fk_Manutencao_Equipamento` (`Equipamento_idEquipamento`),
  KEY `fk_Manutencao_Responsavel` (`ResponsavelManutencao`),
  CONSTRAINT `fk_Manutencao_Equipamento` FOREIGN KEY (`Equipamento_idEquipamento`) REFERENCES `equipamento` (`idEquipamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Manutencao_Responsavel` FOREIGN KEY (`ResponsavelManutencao`) REFERENCES `funcionario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `CPF_CNPJ` varchar(18) NOT NULL,
  `EmailContato` varchar(100) DEFAULT NULL,
  `TelefoneContato` varchar(20) DEFAULT NULL,
  `Logradouro` varchar(100) DEFAULT NULL,
  `CEP` varchar(10) DEFAULT NULL,
  `Cidade` varchar(50) DEFAULT NULL,
  `Bairro` varchar(50) DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL,
  `UF` varchar(2) DEFAULT NULL,
  `Descricao` text DEFAULT NULL,
  `Observacoes` text DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- Table structure for table `equipamento`
--

CREATE TABLE `equipamento` (
  `idEquipamento` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `SerialNumber` varchar(45) NOT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `DataEntrada` date DEFAULT NULL,
  `DataSaida` date DEFAULT NULL,
  `Descricao` text DEFAULT NULL,
  `Observacoes` text DEFAULT NULL,
  `Cliente_idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idEquipamento`),
  KEY `fk_Equipamento_Cliente` (`Cliente_idCliente`),
  CONSTRAINT `fk_Equipamento_Cliente` FOREIGN KEY (`Cliente_idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Table structure for table `funcionario`
--

CREATE TABLE `funcionario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `TipoUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--
-- Table structure for table `historicoatividades`
--


CREATE TABLE `historicoatividades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `atividade` text NOT NULL,
  `data_registro` datetime NOT NULL DEFAULT current_timestamp(),
  `tabelaAfetada` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;





--
-- Table structure for table `ordemservico`
--


CREATE TABLE `ordemservico` (
  `idOrdemServico` int(11) NOT NULL AUTO_INCREMENT,
  `Equipamento_idEquipamento` int(11) NOT NULL,
  `Servico_idServico` int(11) NOT NULL,
  PRIMARY KEY (`idOrdemServico`),
  KEY `fk_OrdemServico_Equipamento` (`Equipamento_idEquipamento`),
  KEY `fk_OrdemServico_Servico` (`Servico_idServico`),
  CONSTRAINT `fk_OrdemServico_Equipamento` FOREIGN KEY (`Equipamento_idEquipamento`) REFERENCES `equipamento` (`idEquipamento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_OrdemServico_Servico` FOREIGN KEY (`Servico_idServico`) REFERENCES `servico` (`idServico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



--
-- Table structure for table `servico`
--

CREATE TABLE `servico` (
  `idServico` int(11) NOT NULL AUTO_INCREMENT,
  `TipoServico` varchar(100) DEFAULT NULL,
  `DataInicio` date DEFAULT NULL,
  `DataFim` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Setor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idServico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;




--
-- Table structure for table `servicosfuncionario`
--

CREATE TABLE `servicosfuncionario` (
  `idServicosFuncionario` int(11) NOT NULL AUTO_INCREMENT,
  `Funcionario_idUsuario` int(11) NOT NULL,
  `Servico_idServico` int(11) NOT NULL,
  PRIMARY KEY (`idServicosFuncionario`),
  KEY `fk_ServicosFuncionario_Funcionario` (`Funcionario_idUsuario`),
  KEY `fk_ServicosFuncionario_Servico` (`Servico_idServico`),
  CONSTRAINT `fk_ServicosFuncionario_Funcionario` FOREIGN KEY (`Funcionario_idUsuario`) REFERENCES `funcionario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ServicosFuncionario_Servico` FOREIGN KEY (`Servico_idServico`) REFERENCES `servico` (`idServico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

