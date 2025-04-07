# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

## Modelagem da situação atual (Modelagem AS IS)

Apresente uma descrição textual de como os sistemas atuais resolvem o problema que seu projeto se propõe a resolver. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional.

Com o tema do projeto definido, escolham alguns processos no contexto de negócios. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. Colem aqui os modelos dos processos atuais (modelo AS-IS), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina.

## Descrição geral da proposta (Modelagem TO BE)

Tendo identificado os gargalos dos modelos AS-IS, apresentem uma descrição da proposta de solução, buscando maior eficiência com a introdução da tecnologia. Abordem também os limites dessa solução e seu alinhamento com as estratégias e objetivos do contexto de negócio escolhido.

Cole aqui os modelos da solução proposta (modelo TO-BE), elaborados com o apoio da ferramenta baseada em BPMN utilizada na disciplina. Cada processo identificado deve ter seu modelo TO-BE específico. Descrevam as oportunidades de melhoria de cada processo da solução proposta.

Apresente aqui uma descrição da sua proposta, abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente também as oportunidades de melhoria.

## Modelagem dos processos

[PROCESSO 1 - Nome do processo](./processes/processo-1-nome-do-processo.md "Detalhamento do processo 1.")

[PROCESSO 2 - Nome do processo](./processes/processo-2-nome-do-processo.md "Detalhamento do processo 2.")

## Indicadores de desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues |Mede a % de material entregue dentro do mês | Sistema de Pedidos / Entregas | (número de pedidos entregues / número total de pedidos) * 100 |
| Taxa de requisições atendidas no prazo | Aumentar a confiabilidade entre setores internos da empresa | Mede a porcentagem de requisições internas (como peças para manutenção) atendidas no prazo | Sistema Interno de Requisições | (nº de requisições atendidas no prazo / nº total de requisições) * 100 |
| Tempo médio de atendimento técnico | Melhorar o suporte ao cliente em relação a pedidos e peças | Tempo médio entre a abertura e a resolução de um chamado técnico | Sistema de Atendimento | (soma dos tempos de atendimento / nº total de atendimentos) |
| Taxa de cobertura de peças solicitadas | Garantir a disponibilidade de peças solicitadas | Mede quantas das peças solicitadas estão disponíveis em estoque | Requisições | (número de peças disponíveis / número de peças solicitadas) * 100 |
| Índice de confiabilidade do estoque | Reduzir divergências entre sistema e estoque físico | Mede a precisão dos registros de estoque em relação ao inventário real | Inventário físico / Sistema | ((nº de itens corretos / total de itens verificados) * 100) |
