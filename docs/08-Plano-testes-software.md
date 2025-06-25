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

Comente sobre as ferramentas de testes utilizadas.

> **Links úteis**:
>
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e técnicas de testes ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de teste para JavaScript](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
