### 3.3.3 Processo 3 – TO-BE interno

Este processo trata da manutenção de equipamentos utilizados internamente pela empresa Porto Ferreira Locações. Atualmente, esse processo é realizado de forma manual, sem um sistema informatizado que acompanhe desde a solicitação até a finalização dos reparos.

**Oportunidades de melhoria:**
- Automatizar o cadastro de solicitações de manutenção.
- Centralizar a comunicação entre setores (solicitante, manutenção, gerência).
- Acompanhar o status em tempo real das solicitações e reparos.
- Controlar orçamentos, aprovações e prazos.
- Disponibilizar histórico de manutenção por equipamento.

A seguir, apresentamos o modelo do processo 2, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 2](../images/to-BE%20INTERNO%20att.png "Modelo BPMN do Processo 2.")


#### Detalhamento das atividades

   Atividade: Informar necessidade de manutenção

- **Equipamento** – *Caixa de texto* – Identificação do equipamento com problema.
- **Código de patrimônio** – *Número* – Código de controle do equipamento.
- **Descrição do problema** – *Área de texto* – Relato do defeito ou necessidade percebida.
- **Setor solicitante** – *Seleção única* – Indica qual setor da empresa solicitou a manutenção.

---

   Atividade: Cadastrar solicitação

- **Data de solicitação** – *Data* – Quando a manutenção foi solicitada.
- **Solicitante** – *Caixa de texto* – Nome de quem solicitou a manutenção.
- **Prioridade** – *Seleção única* – Define o nível de urgência.
- **Anexo de imagem** – *Imagem* – Evidência visual do problema.

---

   Atividade: Avaliar o equipamento

- **Avaliação técnica** – *Área de texto* – Diagnóstico feito pela equipe técnica.
- **Necessita orçamento externo** – *Seleção única* – Define se o serviço precisa ser terceirizado.
- **Atualizar status** – *Seleção única* – Estado atual da solicitação (Ex: Em avaliação, Aguardando orçamento, Aprovado, Reprovado).

---

   Atividade: Consolidação de valores

- **Valor estimado** – *Número* – Custo estimado do reparo.
- **Tempo estimado (dias)** – *Número* – Duração prevista para a execução.
- **Aprovação do gerente** – *Seleção única* – Confirmação da viabilidade do reparo pelo gerente.

---

   Atividade: Executar reparos

- **Técnico responsável** – *Caixa de texto* – Nome do responsável pelos reparos.
- **Descrição dos reparos** – *Área de texto* – Detalhes do que foi feito.
- **Peças utilizadas** – *Tabela* – Lista de materiais e peças empregadas.
- **Atualizar status** – *Seleção única* – Atualização do progresso da manutenção.

---

   Atividade: Testar equipamento

- **Resultado do teste** – *Seleção única* – Verifica se o equipamento foi aprovado ou reprovado após o conserto.
- **Observações** – *Área de texto* – Comentários adicionais sobre o teste.

---

**Informar necessidade de manutenção**

| **Campo**               | **Tipo**        | **Restrições**            | **Valor default** |
|-------------------------|------------------|-----------------------------|--------------------|
| Equipamento             | Caixa de texto   | Obrigatório                 |                    |
| Código de patrimônio    | Número           | Obrigatório, valor numérico |                    |
| Descrição do problema   | Área de texto    | Obrigatório                 |                    |
| Setor solicitante       | Seleção única    | Lista de setores internos   |                    |

| **Comandos**     | **Destino**               | **Tipo**   |
|------------------|----------------------------|------------|
| Enviar           | Cadastrar solicitação      | default    |
| Cancelar         | Fim do processo            | cancel     |

---

**Cadastrar solicitação**

| **Campo**               | **Tipo**          | **Restrições**              | **Valor default** |
|-------------------------|--------------------|-------------------------------|--------------------|
| Data de solicitação     | Data               | Obrigatório                   | Data atual         |
| Solicitante             | Caixa de texto     | Obrigatório                   |                    |
| Prioridade              | Seleção única      | Alta, Média, Baixa            | Média              |
| Anexo de imagem         | Imagem             | Opcional                      |                    |

| **Comandos**     | **Destino**           | **Tipo**   |
|------------------|------------------------|------------|
| Salvar           | Avaliar equipamento    | default    |

---

**Avaliar o equipamento**

| **Campo**                   | **Tipo**         | **Restrições**                         | **Valor default** |
|-----------------------------|------------------|-----------------------------------------|--------------------|
| Avaliação técnica           | Área de texto    | Obrigatório                             |                    |
| Necessita orçamento externo | Seleção única    | Sim, Não                                 |                    |
| Atualizar status            | Seleção única    | Em avaliação, Aguardando orçamento, Aprovado, Reprovado | Em avaliação        |

| **Comandos**                | **Destino**                  | **Tipo**   |
|----------------------------|-------------------------------|------------|
| Encaminhar para orçamento  | Orçamento externo             | default    |
| Aprovar internamente       | Consolidação de valores       | default    |
| Atualizar status           | Atualizar status              | automático |


---

**Consolidação de valores**

| **Campo**           | **Tipo**      | **Restrições**     | **Valor default** |
|---------------------|----------------|----------------------|--------------------|
| Valor estimado       | Número        | Obrigatório         |                    |
| Tempo estimado (dias)| Número        | Obrigatório         |                    |
| Aprovação do gerente | seleção unica | Obrigatório         |                    |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Enviar   | executar reparos | default    |
| Cancelar | Fim | --- |

---

**Executar reparos**

| **Campo**            | **Tipo**      | **Restrições**     | **Valor default** |
|----------------------|----------------|----------------------|--------------------|
| Tecnico responsavel | Caixa de texto | Obrigatório |  |
| Descrição dos reparos| Área de texto  | Obrigatório         |                    |
| Peças utilizadas      | Tabela         | Opcional             |                    |
| Atualizar status            | Seleção única    | Em avaliação, Aguardando orçamento, Aprovado, Reprovado | Em avaliação        |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Enviar para     | Testar equipamento   | default    |
| Atualizar status           | Atualizar status | automático |

---

**Testar equipamento**

| **Campo**                 | **Tipo**      | **Restrições**     | **Valor default** |
|---------------------------|----------------|----------------------|--------------------|
| Resultado do teste        | Seleção única  | Aprovado, Reprovado |                    |
| Observações               | Área de texto  | Opcional             |                    |

| **Comandos**         | **Destino**                 | **Tipo**   |
|----------------------|------------------------------|------------|
| Equipamento aprovado | Atualizar status final       | default    |
| Reprovado            | Reabrir manutenção           | default    |

---