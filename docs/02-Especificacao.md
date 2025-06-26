# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

O projeto tem como objetivo resolver as dificuldades que os profissionais de manutenção enfrentam na organização e no acompanhamento das ordens de serviço. Atualmente, a ausência de um sistema eficiente para registrar, monitorar e atualizar o status das manutenções resulta em atrasos, desorganização e um impacto negativo na produtividade da equipe.

A solução proposta é o desenvolvimento de um sistema centralizado que torne mais fácil o registro, a atualização e o monitoramento das manutenções em tempo real. O intuito é otimizar a comunicação entre técnicos, supervisores e clientes, garantindo maior transparência e controle operacional.

## Personas

• Carlos Ferreira tem 35 anos, trabalha há 10 anos na área de manutenção e está acostumado a resolver problemas técnicos rapidamente. No entanto, enfrenta dificuldades na organização das ordens de serviço e na atualização do status das manutenções. Ele busca uma solução que facilite a consulta e o registro dos serviços realizados.

• Mariana Souza tem 42 anos, é responsável por supervisionar as manutenções e garantir que os serviços sejam concluídos dentro dos prazos. Seu trabalho envolve acompanhar a produtividade da equipe e gerar relatórios para embasar a tomada de decisões. Ela busca uma solução que facilite o monitoramento das manutenções, proporcionando uma visão mais clara e ágil do andamento dos serviços.

• João Pedro, 37 anos, é o primeiro ponto de contato dos clientes que solicitam manutenção. Ele é responsável por registrar as ordens de serviço e fornecer respostas ágeis e precisas sobre o status das manutenções. Para isso, precisa de uma solução que facilite a visualização em tempo real da situação das máquinas em manutenção, permitindo um atendimento mais eficiente e assertivo aos clientes.

• Sérgio Rodrigues, 56 anos, é empresário e proprietário de uma empresa especializada na manutenção de equipamentos próprios e de terceiros. Devido ao grande volume de máquinas em manutenção, ele enfrenta desafios para monitorar o status de cada uma e manter um controle eficiente. Por isso, busca uma solução que centralize as informações e facilite o acompanhamento dos serviços, garantindo maior organização e otimização do processo.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`                              | QUERO/PRECISO ... `FUNCIONALIDADE`                                                 |PARA ... `MOTIVO/VALOR`                                                                        |
|--------------------------------------------------|------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
|Carlos Ferreira (Técnico de manutenção)           | Registrar e atualizar o status das manutenções de forma rápida e organizada        | Melhorar a eficiência no acompanhamento dos serviços e evitar atrasos                         |
|Mariana Souza (Supervisora de manutenção)         | Acompanhar o andamento das manutenções em tempo real                               | Garantir que os serviços sejam concluídos dentro dos prazos                                   |
|João Pedro (Atendente)                            | Consultar rapidamente o status das ordens de serviço                               | Responder com agilidade e precisão às dúvidas dos clientes                                    |
|Sérgio Rodrigues (Empresário)                     | Monitorar todas as manutenções de forma centralizada                               | Melhorar a organização e garantir um controle eficiente
|Carlos Ferreira (Técnico de manutenção)	         | Acessar o histórico de manutenções de um equipamento	                              | Realizar diagnósticos mais precisos e evitar retrabalho dos serviços prestados 
|Mariana Souza (Supervisora de manutenção)         | Delegar ordens de serviço diretamente pelo sistema                                 | Melhorar a distribuição de tarefas e aumentar a produtividade da equipe
|João Pedro (Atendente)                            | 	Visualizar o status das manutenções em um painel unificado                        | Informar os clientes com mais precisão e rapidez
|Sérgio Rodrigues (Empresário)                     | Configurar alertas para manutenções críticas ou atrasadas                          | Prevenir impactos nos contratos e garantir a satisfação dos clientes           



## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastro de Equipamentos | ALTA | 
|RF-002| Registro de Ordens de Serviço   | ALTA |
|RF-003| Atualização de Status   | ALTA |
|RF-004| Histórico de Manutenção   | MÉDIA |
|RF-005| Notificações e Alertas   | MÉDIA |
|RF-006| Relatórios Gerenciais   | MÉDIA |
|RF-007| Controle de Acesso   | ALTA |
|RF-008| Busca e Filtros   | MÉDIA |
|RF-009|	Delegação de Ordens de Serviço  |	MÉDIA |
|RF-010|	Painel de Status em Tempo Real	| ALTA |
|RF-011|	Exportação de Dados (PDF/Excel)	| MÉDIA |
|RF-012|	Dashboard com Indicadores de Desempenho	| MÉDIA |
|RF-013|	Integração com E-mail e WhatsApp para alertas	| MÉDIA |
|RF-014|	Agendamento de Manutenções Preventivas	| ALTA |
|RF-015|	Comentários e Anexos em Ordens de Serviço	| MÉDIA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Segurança | ALTA | 
|RNF-002| Usabilidade |  ALTA | 
|RNF-003| Performance |  MÉDIA | 
|RNF-004| Escalabilidade |  MÉDIA | 
|RNF-005| Disponibilidade |  ALTA | 
|RNF-006| Compatibilidade |  MÉDIA | 
|RNF-007| Backup |  ALTA | 


## Restrições

| **ID** | **Restrição**                                                                 |
|--------|-------------------------------------------------------------------------------|
| 001    | O projeto deve ser entregue até o final do semestre, não permitindo prorrogações no cronograma estabelecido. |
| 002    | O custo total do projeto não deve ultrapassar o orçamento previamente definido, o que exige um gerenciamento rigoroso dos recursos financeiros. |
| 003    | O sistema deve ser compatível com os equipamentos e dispositivos já utilizados pela equipe de manutenção, sem a necessidade de grandes investimentos em novos hardwares. |
| 004    | O sistema deve garantir a segurança das informações sensíveis, incluindo dados de clientes e históricos de manutenção, atendendo às normas de proteção de dados como a LGPD (Lei Geral de Proteção de Dados). |
| 005    | O sistema deve ser capaz de se integrar com ferramentas ou plataformas já utilizadas pela empresa, como sistemas de gestão de manutenção anteriores, sem exigir grandes mudanças ou adaptações. |
| 006    | O desenvolvimento do projeto dependerá da disponibilidade e alocação de profissionais internos da empresa. Caso a equipe técnica necessária não esteja disponível, isso poderá impactar no andamento do projeto, exigindo uma revisão de prazos. |

## Diagrama de casos de uso

![WiseFix](https://github.com/user-attachments/assets/256af132-02ee-428a-8d9f-b74b8b0bd333)
