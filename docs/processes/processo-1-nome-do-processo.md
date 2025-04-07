### 3.3.1 Processo 1 – NOME DO PROCESSO

_Apresente aqui o nome e as oportunidades de melhoria para o processo 1. 
Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN._
 
![Exemplo de um Modelo BPMN do PROCESSO 1](../images/process.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_


**Informar necessidade**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Descrição da solicitação | Área de texto  |   Obrigatório             |        —           |
| Data da solicitação | 	Data  |   Obrigatório             |        —           |
| Nome do solicitante | Caixa de texto  |  	Somente letras           |        -         |


| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| enviar | Cadastrar solicitação  | Default |




**Cadastrar solicitação**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Número da solicitação | 	Número  |        	Automático        |          —        |
|         Equipamento       |           Caixa de texto       |      	Obrigatório      |        —           |
|         Cliente       |           Caixa de texto       |      	Obrigatório      |        —           |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| enviar | Avaliar o equipamento  | default | 




**Avaliar o equipamento**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|         Diagnóstico       |           Área de texto       |      	Obrigatório      |        —           |
|         Falta peça ou serviço?       |           Seleção única (sim/não)       |      	Obrigatório      |        —           |
|         Técnico responsável      |           Caixa de texto       |      	Obrigatório      |        —           |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| enviar | Consolidação de valores  | default |




**Consolidação de valores**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|         Valor total       |           Caixa de texto       |      	Obrigatório      |        —           |
|         Justificativa       |          Área de texto      |      	Obrigatório      |        —           |
|         Responsável      |           Caixa de texto       |      	Obrigatório      |        —           |
|         Aprovação do gerente      |           Seleção única(sim/não)       |      	Obrigatório      |        —           |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| cancelar                | FIM                           | ---               |
| enviar | Executar reparos  | default |




**Executar reparos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|         Técnico responsável      |           Caixa de texto       |      	Obrigatório      |        —           |
|         Ações realizadas      |          Área de texto     |      	Obrigatório      |        —           |
|         Peças substituídas      |           Área de texto       |      	Obrigatório      |        —           |
|         Data da execução    |          Data       |      	Obrigatório      |        —           |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| enviar | Testar equipamento  | default |




**Testar equipamentos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|         Técnico responsável      |           Caixa de texto       |      	Obrigatório      |        —           |
|         Observações    |          Área de texto     |      	Obrigatório      |        —           |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| enviar | FIM  | default |
