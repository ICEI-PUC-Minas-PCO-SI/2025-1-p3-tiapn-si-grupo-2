# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

|              **Caso de teste**               |                                                                      **CT-001 – Cadastro de Equipamentos**                                                                       |
| :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|             Requisito associado              |                                                                        RF-001 - Cadastro de Equipamentos                                                                         |
|              Objetivo do teste               |                                                     Verificar se o usuário consegue cadastrar novos equipamentos no sistema.                                                     |
|                    Passos                    | - Acessar o sistema <br> - Navegar até a seção de cadastro de equipamentos <br> - Preencher os campos obrigatórios (nome, tipo, número de série, etc.) <br> - Clicar em "Salvar" |
|              Critério de êxito               |                                                  - O equipamento foi cadastrado com sucesso e aparece na lista de equipamentos.                                                  |
| Responsável pela elaboração do caso de teste |                                                                          Nome do integrante da equipe.                                                                           |

<br>

|              **Caso de teste**               |                                                                          **CT-002 – Registro de Ordens de Serviço**                                                                          |
| :------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|             Requisito associado              |                                                                            RF-002 - Registro de Ordens de Serviço                                                                            |
|              Objetivo do teste               |                                                             Verificar se o usuário consegue registrar uma nova ordem de serviço.                                                             |
|                    Passos                    | - Acessar o sistema <br> - Navegar até a seção de ordens de serviço <br> - Preencher os campos obrigatórios (cliente, equipamento, descrição do problema, etc.) <br> - Clicar em "Registrar" |
|              Critério de êxito               |                                                   - A ordem de serviço foi registrada com sucesso e aparece na lista de ordens de serviço.                                                   |
| Responsável pela elaboração do caso de teste |                                                                                Nome do integrante da equipe.                                                                                 |

<br>

|              **Caso de teste**               |                                                                               **CT-003 – Atualização de Status**                                                                                |
| :------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|             Requisito associado              |                                                                                 RF-003 - Atualização de Status                                                                                  |
|              Objetivo do teste               |                                                           Verificar se o usuário consegue atualizar o status de uma ordem de serviço.                                                           |
|                    Passos                    | - Acessar o sistema <br> - Navegar até a lista de ordens de serviço <br> - Selecionar uma ordem de serviço <br> - Alterar o status (ex.: "Em andamento", "Concluído") <br> - Clicar em "Salvar" |
|              Critério de êxito               |                                                                   - O status da ordem de serviço foi atualizado com sucesso.                                                                    |
| Responsável pela elaboração do caso de teste |                                                                                  Nome do integrante da equipe.                                                                                  |

<br>

|              **Caso de teste**               |                                                                                                **CT-004 – Controle de Acesso**                                                                                                 |
| :------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|             Requisito associado              |                                                                                                  RF-007 - Controle de Acesso                                                                                                   |
|              Objetivo do teste               |                                                                   Verificar se o sistema restringe o acesso a funcionalidades com base no perfil do usuário.                                                                   |
|                    Passos                    | - Acessar o sistema com diferentes perfis de usuário (técnico, supervisor, administrador) <br> - Tentar acessar funcionalidades restritas a outros perfis <br> - Verificar se o acesso é negado ou permitido conforme esperado |
|              Critério de êxito               |                                                                     - O sistema restringe ou permite o acesso corretamente com base no perfil do usuário.                                                                      |
| Responsável pela elaboração do caso de teste |                                                                                                 Nome do integrante da equipe.                                                                                                  |

<br>

## Ferramentas de testes (opcional)

Os testes descritos neste plano são realizados de forma manual, ou seja, não utilizam ferramentas automatizadas para execução. Isso significa que os membros da equipe seguem os passos descritos em cada caso de teste, verificando manualmente se os critérios de êxito são atendidos.

Esse tipo de teste é o suficiente para o contexto do nosso projeto. Além disso, os testes manuais permitem uma avaliação mais detalhada da experiência do usuário, identificando problemas que podem não ser detectados por ferramentas automatizadas.

### Ferramentas auxiliares para testes manuais:

- **Planilhas**: Utilizadas para registrar os resultados de cada caso de teste, facilitando o acompanhamento e a análise posterior.
- **Captura de tela**: Ferramentas como o Snipping Tool ou Print Screen ajudam a documentar problemas encontrados durante os testes.
- **Navegadores**: Testes são realizados diretamente em navegadores como Google Chrome, Mozilla Firefox ou Microsoft Edge, dependendo da compatibilidade do sistema.
- **Documentação**: A especificação do projeto e os casos de teste servem como guias para garantir que todos os requisitos estão sendo avaliados corretamente.

Embora os testes manuais sejam eficazes, é importante considerar a automação em etapas futuras do projeto para aumentar a eficiência e a cobertura dos testes.

> **Links úteis**:
>
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
