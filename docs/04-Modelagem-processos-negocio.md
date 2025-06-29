# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>


## Modelagem da situação atual (Modelagem AS IS)

Atualmente, a empresa utiliza o Trello para registrar os equipamentos enviados para manutenção, além de recorrer ao uso de fichas em papel para anotar os dados dos clientes. No entanto, essa abordagem não se mostra eficaz na comunicação entre os setores, o que acaba gerando diversos desafios operacionais. Quando um equipamento chega para manutenção, ele é registrado no Trello, mas a ferramenta não oferece recursos adequados para acompanhar de forma clara e eficiente o andamento de cada serviço. Isso compromete a visibilidade do processo, dificulta a troca de informações entre os setores envolvidos e pode levar a atrasos, retrabalho e falhas no atendimento ao cliente.

Uma das maiores dores enfrentadas atualmente é justamente a falta de visibilidade e alinhamento entre os setores sobre o status dos equipamentos. Isso causa atrasos, retrabalho, perda de tempo e, muitas vezes, informações inconsistentes ou desatualizadas, prejudicando tanto a operação interna quanto a experiência do cliente.

O novo sistema proposto busca resolver esse problema por meio da implementação de uma plataforma web integrada, na qual cada setor poderá registrar e consultar atualizações de status de forma centralizada e em tempo real. O sistema contará com um painel de acompanhamento do fluxo dos equipamentos, permitindo que os funcionários indiquem em que etapa o serviço se encontra — como "Recebido", "Em análise", "Em manutenção", "Aguardando peça", "Pronto para entrega" ou "Entregue ao cliente". Essa visibilidade facilitará a comunicação interna e reduzirá a necessidade de consultas informais, agilizando o processo e minimizando falhas. Além disso, o sistema será preparado para tratar fluxos críticos, como notificações automáticas em caso de atrasos, alertas sobre inconsistências no registro de informações e registro de ocorrências quando um equipamento não puder seguir o fluxo padrão (por exemplo, quando uma peça necessária estiver em falta ou houver recusa do orçamento por parte do cliente). Isso garantirá maior alinhamento entre os setores e melhorará significativamente a experiência do cliente.


[PROCESSO 1 EM PDF - AS-IS-INTERNO](./processes/AS-IS-Interno.pdf "Processo 1.")

[PROCESSO 2 EM PDF- AS-IS-TERCEIROS](./processes/AS-IS-Terceiros.pdf "Processo 2.")

## Descrição geral da proposta (Modelagem TO BE)

A proposta de solução tem como foco principal a melhoria da comunicação entre os setores envolvidos no processo de manutenção de equipamentos de terceiros, utilizando recursos tecnológicos para proporcionar mais controle, rastreabilidade e eficiência operacional.

O novo sistema permitirá que cada setor registre e atualize o status do equipamento conforme sua responsabilidade, criando uma linha do tempo clara e compartilhada sobre o andamento do serviço. Esses status não serão acessíveis diretamente pelos clientes, mas estarão visíveis em tempo real para os funcionários da loja, especialmente o time de atendimento. Isso representa um avanço significativo, pois permitirá que qualquer atendente possa informar ao cliente, de forma rápida e precisa, a situação atual do seu equipamento, eliminando a necessidade de consultas manuais, buscas físicas ou ligações internas desnecessárias.

Essa padronização da comunicação entre setores reduz falhas, evita retrabalho e torna o processo mais fluido, beneficiando toda a operação e, indiretamente, melhorando a satisfação do cliente.

### Limites da Solução

Apesar das melhorias, o sistema não fornecerá acesso direto ao cliente final, o que significa que o cliente ainda dependerá do contato com a loja para obter informações. Essa decisão foi tomada estrategicamente para evitar a exposição de dados sensíveis do processo interno e manter o controle centralizado nas mãos da equipe.

### Alinhamento com os Objetivos do Negócio
 - A proposta está totalmente alinhada com os objetivos do negócio, que incluem:

 - Redução de erros de comunicação entre os setores;

 - Melhoria da eficiência no atendimento ao cliente;

 - Padronização dos processos internos de manutenção;


A introdução do novo sistema com controle de status internos é uma solução prática, de fácil adoção e com grande potencial de impacto positivo no dia a dia da empresa.

[PROCESSO 3 EM PDF - TO-BE-INTERNO](./processes/TO-BE-Internos.pdf "Processo 3.")


[PROCESSO 4 EM PDF - TO-BE-TERCEIROS](./processes/TO-BE_Terceiros.pdf "Processo 4.")

## Modelagem dos processos

[PROCESSO 1 - AS-IS-INTERNO](./processes/processo-1-AS-IS-INTERNO.md "Detalhamento do processo 1.")

[PROCESSO 2 - AS-IS-TERCEIROS](./processes/processo-2-AS-IS-TERCEIROS.md "Detalhamento do processo 2.")

[PROCESSO 3 - TO-BE-INTERNO](./processes/processo-3-TO-BE-interno.md "Detalhamento do processo 3.")

[PROCESSO 4 - TO-BE-TERCEIROS](./processes/Processo-4-TO-BE-terceiros.md "Detalhamento do processo 4.")

## Indicadores de desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues |Mede a % de material entregue dentro do mês | Sistema de Pedidos / Entregas | (número de pedidos entregues / número total de pedidos) * 100 |
| Taxa de requisições atendidas no prazo | Aumentar a confiabilidade entre setores internos da empresa | Mede a porcentagem de requisições internas (como peças para manutenção) atendidas no prazo | Sistema Interno de Requisições | (nº de requisições atendidas no prazo / nº total de requisições) * 100 |
| Tempo médio de atendimento técnico | Melhorar o suporte ao cliente em relação a pedidos e peças | Tempo médio entre a abertura e a resolução de um chamado técnico | Sistema de Atendimento | (soma dos tempos de atendimento / nº total de atendimentos) |
| Taxa de cobertura de peças solicitadas | Garantir a disponibilidade de peças solicitadas | Mede quantas das peças solicitadas estão disponíveis em estoque | Requisições | (número de peças disponíveis / número de peças solicitadas) * 100 |
| Índice de confiabilidade do estoque | Reduzir divergências entre sistema e estoque físico | Mede a precisão dos registros de estoque em relação ao inventário real | Inventário físico / Sistema | ((nº de itens corretos / total de itens verificados) * 100) |
