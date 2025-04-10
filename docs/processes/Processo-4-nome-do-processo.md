---

### 3.3.4 Processo 4 – TO-BE terceiros

Este processo trata da manutenção de equipamentos de clientes externos da empresa Porto Ferreira Locações. Atualmente, esse fluxo ocorre com diversas etapas realizadas manualmente ou por canais desconectados, dificultando o controle de prazos, aprovações e comunicação com o cliente.

**Oportunidades de melhoria:**
- Automatizar o envio e resposta de orçamentos.
- Acompanhar o status de forma transparente com os clientes.
- Reduzir falhas na comunicação entre setores e com o cliente.
- Controlar pagamentos e entregas de forma segura e rastreável.

A seguir, apresentamos o modelo do processo 4, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 4](../images/to-BE%20TERCEIROS.png "Modelo BPMN do Processo 4.")

---

#### Detalhamento das atividades

   Atividade: Receber equipamento do cliente

- **Cliente** – *Caixa de texto* – Nome do cliente ou empresa.
- **Equipamento** – *Caixa de texto* – Identificação do item recebido.
- **Data de entrada** – *Data* – Registro de quando o equipamento foi entregue.
- **Funcionário responsável** – *Seleção única* – Quem recebeu o item.
- **Comprovante de recebimento** – *Sim/Não* – Indica se foi emitido.

---

   Atividade: Avaliar equipamento

- **Diagnóstico técnico** – *Área de texto* – Descrição do problema identificado.
- **Necessita orçamento?** – *Seleção única* – Sim, Não.
- **Status da avaliação** – *Seleção única* – Em avaliação, Orçando, Falta peça.

---

   Atividade: Enviar orçamento

- **Valor estimado** – *Número* – Custo previsto da manutenção.
- **Prazo estimado (dias)** – *Número* – Tempo previsto para conclusão.
- **Canal de envio** – *Seleção única* – E-mail, WhatsApp, Plataforma.
- **Status do orçamento** – *Seleção única* – Enviado, Aguardando resposta.

---

   Atividade: Receber aprovação do cliente

- **Cliente aprovou?** – *Seleção única* – Aprovado, Negado.
- **Data de resposta** – *Data* – Quando o cliente respondeu.
- **Observações do cliente** – *Área de texto* – Comentários recebidos.

---

   Atividade: Executar reparos

- **Técnico responsável** – *Caixa de texto* – Nome de quem fez o reparo.
- **Serviços realizados** – *Área de texto* – O que foi feito no equipamento.
- **Peças utilizadas** – *Tabela* – Materiais ou componentes trocados.
- **Atualizar status** – *Seleção única* – Em manutenção, Aguardando coleta.

---

   Atividade: Testar equipamento

- **Resultado do teste** – *Seleção única* – Aprovado, Reprovado.
- **Necessita retrabalho?** – *Sim/Não* – Em caso de falha no teste.
- **Observações** – *Área de texto* – Informações adicionais do teste.

---

   Atividade: Avisar cliente para coleta

- **Mensagem enviada?** – *Seleção única* – Sim, Não.
- **Data da mensagem** – *Data* – Quando o cliente foi avisado.
- **Canal de contato** – *Seleção única* – WhatsApp, E-mail, Chamada.

---

   Atividade: Cliente retira equipamento

- **Data da retirada** – *Data* – Registro da retirada.
- **Assinatura eletrônica** – *Caixa de texto* – Confirmação de recebimento.
- **Comprovante entregue** – *Sim/Não* – Emissão de recibo de retirada.

---

   Atividade: Processar pagamento

- **Valor pago** – *Número* – Total recebido do cliente.
- **Forma de pagamento** – *Seleção única* – Dinheiro, PIX, Cartão.
- **Status do pagamento** – *Seleção única* – Pago, Pendente.

---

**Receber equipamento do cliente**

| **Campo**                   | **Tipo**        | **Restrições**               | **Valor default** |
|-----------------------------|------------------|-------------------------------|--------------------|
| Cliente                     | Caixa de texto   | Obrigatório                   |                    |
| Equipamento                 | Caixa de texto   | Obrigatório                   |                    |
| Data de entrada             | Data             | Obrigatório                   | Data atual         |
| Funcionário responsável     | Seleção única    | Obrigatório                   |                    |
| Comprovante de recebimento  | Seleção única    | Sim, Não                       | Sim                |

| **Comandos**     | **Destino**           | **Tipo**   |
|------------------|------------------------|------------|
| Registrar        | Avaliar equipamento    | default    |
| Cancelar         | Fim do processo        | cancel     |

---

**Avaliar equipamento**

| **Campo**             | **Tipo**        | **Restrições**           | **Valor default** |
|-----------------------|------------------|---------------------------|--------------------|
| Diagnóstico técnico   | Área de texto    | Obrigatório               |                    |
| Necessita orçamento?  | Seleção única    | Sim, Não                  | Sim                |
| Status da avaliação   | Seleção única    | Em avaliação, Orçando, Falta peça | Em avaliação |

| **Comandos**        | **Destino**       | **Tipo**   |
|---------------------|--------------------|------------|
| Encaminhar orçamento| Enviar orçamento   | default    |
| Atualizar status    | Atualizar status   | automático |

---

**Enviar orçamento**

| **Campo**             | **Tipo**      | **Restrições**     | **Valor default** |
|-----------------------|----------------|----------------------|--------------------|
| Valor estimado        | Número        | Obrigatório         |                    |
| Prazo estimado (dias) | Número        | Obrigatório         |                    |
| Canal de envio        | Seleção única | Obrigatório         | E-mail             |
| Status do orçamento   | Seleção única | Enviado, Aguardando resposta | Enviado         |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Enviar               | Receber aprovação do cliente | default    |

---

**Receber aprovação do cliente**

| **Campo**             | **Tipo**        | **Restrições**     | **Valor default** |
|-----------------------|------------------|----------------------|--------------------|
| Cliente aprovou?      | Seleção única    | Aprovado, Negado     |                    |
| Data de resposta      | Data             | Obrigatório          | Data atual         |
| Observações do cliente| Área de texto    | Opcional             |                    |

| **Comandos**     | **Destino**         | **Tipo**   |
|------------------|----------------------|------------|
| Aprovado         | Executar reparos     | default    |
| Negado           | Encerrar processo    | cancel     |

---

**Executar reparos**

| **Campo**             | **Tipo**      | **Restrições**     | **Valor default** |
|-----------------------|----------------|----------------------|--------------------|
| Técnico responsável   | Caixa de texto | Obrigatório         |                    |
| Serviços realizados   | Área de texto  | Obrigatório         |                    |
| Peças utilizadas      | Tabela         | Opcional             |                    |
| Atualizar status      | Seleção única  | Em manutenção, Aguardando coleta | Em manutenção |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Encaminhar para teste| Testar equipamento   | default    |
| Atualizar status     | Atualizar status     | automático |

---

**Testar equipamento**

| **Campo**             | **Tipo**        | **Restrições**     | **Valor default** |
|-----------------------|------------------|----------------------|--------------------|
| Resultado do teste    | Seleção única    | Aprovado, Reprovado |                    |
| Necessita retrabalho? | Seleção única    | Sim, Não             | Não                |
| Observações           | Área de texto    | Opcional             |                    |

| **Comandos**         | **Destino**                 | **Tipo**   |
|----------------------|------------------------------|------------|
| Aprovado             | Avisar cliente para coleta   | default    |
| Reprovado            | Executar reparos             | default    |

---

**Avisar cliente para coleta**

| **Campo**             | **Tipo**        | **Restrições**     | **Valor default** |
|-----------------------|------------------|----------------------|--------------------|
| Mensagem enviada?     | Seleção única    | Sim, Não             | Sim                |
| Data da mensagem      | Data             | Obrigatório          | Data atual         |
| Canal de contato      | Seleção única    | WhatsApp, E-mail, Chamada | WhatsApp     |

| **Comandos**         | **Destino**             | **Tipo**   |
|----------------------|--------------------------|------------|
| Aguardando retirada  | Cliente retira equipamento | default    |

---

**Cliente retira equipamento**

| **Campo**                 | **Tipo**      | **Restrições**     | **Valor default** |
|---------------------------|----------------|----------------------|--------------------|
| Data da retirada          | Data           | Obrigatório         | Data atual         |
| Assinatura eletrônica     | Caixa de texto | Obrigatório         |                    |
| Comprovante entregue      | Seleção única  | Sim, Não             | Sim                |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Confirmar retirada   | Processar pagamento | default    |

---

**Processar pagamento**

| **Campo**             | **Tipo**        | **Restrições**     | **Valor default** |
|-----------------------|------------------|----------------------|--------------------|
| Valor pago            | Número           | Obrigatório         |                    |
| Forma de pagamento    | Seleção única    | Dinheiro, PIX, Cartão | PIX             |
| Status do pagamento   | Seleção única    | Pago, Pendente       | Pago               |

| **Comandos**         | **Destino**         | **Tipo**   |
|----------------------|----------------------|------------|
| Finalizar processo   | Fim do processo      | default    |

---
