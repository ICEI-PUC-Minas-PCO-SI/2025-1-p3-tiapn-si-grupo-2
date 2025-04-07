## 3.3.1 Processo 1 – AS-IS-INTERNO

Este processo trata da manutenção de equipamentos utilizados internamente pela empresa Porto Ferreira Locações. Atualmente, esse processo é realizado de forma manual, sem um sistema informatizado que acompanhe desde a solicitação até a finalização dos reparos.

### Oportunidades de melhoria:

Centralizar a comunicação entre setores (solicitante, manutenção, gerência).
Acompanhar o status em tempo real das solicitações e reparos.
Controlar aprovações e prazos.
Disponibilizar histórico de manutenção por equipamento.
 
![Exemplo de um Modelo BPMN do PROCESSO 1](../images/as-is-interno.png "Modelo BPMN do Processo 1.")

#### Detalhamento das atividades

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
