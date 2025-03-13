
# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

Nossa equipe adota uma abordagem colaborativa e estruturada para o desenvolvimento do projeto, utilizando diversas ferramentas para organização, comunicação e versionamento de código. A metodologia de trabalho inclui a definição dos ambientes utilizados, a estrutura para gestão do código-fonte e as ferramentas para organização das tarefas e do fluxo de desenvolvimento.

Ambientes de Trabalho:

Trello – Utilizado para organização e acompanhamento das tarefas da equipe. As atividades são distribuídas em quadros, listas e cartões, seguindo um fluxo de trabalho bem definido. O Trello permite a visualização do progresso do projeto e facilita a comunicação entre os membros.

Miro – Ferramenta utilizada para a criação de diagramas e fluxos do projeto. A equipe utiliza o Miro para mapear processos, estruturar ideias e desenvolver representações visuais que auxiliam na compreensão das etapas do desenvolvimento.

Figma – Responsável pelo design e prototipação das interfaces. O Figma permite a criação de wireframes e protótipos interativos, garantindo que a equipe visualize e refine a experiência do usuário antes da implementação.

GitHub – Repositório utilizado para versionamento do código-fonte. A equipe gerencia o desenvolvimento através de branches, commits e pull requests, garantindo um fluxo de trabalho organizado e rastreável. O GitHub também permite a colaboração assíncrona, facilitando a integração contínua das funcionalidades desenvolvidas.

Processo e Gestão de Equipes:

Divisão de tarefas: As tarefas são distribuídas no Trello e organizadas conforme a prioridade e complexidade.

Reuniões e feedbacks: O Miro é utilizado para brainstorming e definição de fluxos, enquanto o Figma possibilita a validação visual das interfaces.

Versionamento e deploy: O GitHub gerencia o código-fonte, permitindo colaboração segura e controle sobre alterações.

Essa metodologia garante um desenvolvimento eficiente, organizado e colaborativo, maximizando a produtividade e a qualidade do projeto.

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gestão de tags, merges, commits e branches é realizada. Discuta também como a gestão de issues foi feita.

> **Links úteis**:
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e GitHub](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
> - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Planejamento do projeto

###  Divisão de papéis

> Apresente a divisão de papéis entre os membros do grupo em cada Sprint. O desejável é que, em cada Sprint, o aluno assuma papéis diferentes na equipe. Siga o modelo do exemplo abaixo:

#### Sprint 1
- _Scrum master_: Arthur Lima Camargos
- Contexto: Arthur Lima Camargos
- Especificação: Caio Martins Bicalho da Costa, João Vitor Vitalino da Silva Roveda e Vitor Mendonça Braga
- Metodologia: Daniel Heringer Verner Silva e Vitor Mendonça Braga
- README: João Vitor Vitalino da Silva Roveda
- Slide de Apresentação: Daniel Heringer Verner Silva
- Template: Daniel de Queiroz Fernandes

#### Sprint 2
- _Scrum master_: AlunaY
- Desenvolvedor _front-end_: AlunoX
- Desenvolvedor _back-end_: AlunoK
- Testes: AlunaZ

###  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

#### Sprint 1

Atualizado em: 12/03/2025

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Introdução | 01/02/2024     | 07/02/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | Objetivos    | 03/02/2024     | 10/02/2024 | 📝    |                 |
| AlunoY        | Histórias de usuário  | 01/01/2024     | 07/01/2005 | ⌛     |                 |
| Daniel Heringer        | Slide de apresentação  |    10/03/2025        | 12/03/2025 |  ✔️   |    10/03/2025   |
| AlunoK        | Personas 1  |    01/01/2024        | 12/02/2005 | ❌    |       |
| Vitor Mendonça       | Personas e histórias de usuários  |    08/03/2025        | 10/03/2025 | ✔️    |  09/03/2025     |

#### Sprint 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Página inicial   | 01/02/2024     | 07/03/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | CSS unificado    | 03/02/2024     | 10/03/2024 | 📝    |                 |
| AlunoY        | Página de login  | 01/02/2024     | 07/03/2024 | ⌛     |                 |
| AlunoK        | Script de login  |  01/01/2024    | 12/03/2024 | ❌    |       |


Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado


> **Links úteis**:
> - [11 passos essenciais para implantar Scrum no seu projeto](https://mindmaster.com.br/scrum-11-passos/)
> - [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
> - [Os papéis do Scrum e a verdade sobre cargos nessa técnica](https://www.atlassian.com/br/agile/scrum/roles)

### Processo

Coloque informações sobre detalhes da implementação do Scrum seguido pelo grupo. O grupo deverá fazer uso do recurso de gerenciamento de projeto oferecido pelo GitHub, que permite acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.
 
> **Links úteis**:
> - [Planejamento e gestão ágil de projetos](https://pucminas.instructure.com/courses/87878/pages/unidade-2-tema-2-utilizacao-de-ferramentas-para-controle-de-versoes-de-software)
> - [Sobre quadros de projeto](https://docs.github.com/pt/issues/organizing-your-work-with-project-boards/managing-project-boards/about-project-boards)
> - [Project management, made simple](https://github.com/features/project-management/)
> - [Como criar backlogs no GitHub](https://www.youtube.com/watch?v=RXEy6CFu9Hk)
> - [Tutorial slack](https://slack.com/intl/en-br/)

## Relação de ambientes de trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas. Todos os ambientes e frameworks utilizados no desenvolvimento da aplicação estão listados na seção abaixo.

### Ferramentas

Liste todas as ferramentas que foram empregadas no projeto, justificando a escolha delas, sempre que possível.

Exemplo: os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito é apresentada na tabela que se segue.

| Ambiente                            | Plataforma                         | Link de acesso                         |
|-------------------------------------|------------------------------------|----------------------------------------|
| Repositório de código fonte         | GitHub                             | http://....                            |
| Documentos do projeto               | GitHub                             | http://....                            |
| Projeto de interface                | Figma                              | http://....                            |
| Gerenciamento do projeto            | GitHub Projects                    | http://....                            |
| Hospedagem                          | Vercel                             | http://....                            |
