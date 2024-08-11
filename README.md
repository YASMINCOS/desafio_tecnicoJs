# Contabilizar - Teste Técnico de Programação

Este repositório contém um desafio de programação que visa testar habilidades em técnicas de **Programação** e **Manipulação de Dados** usando JavaScript.

## Introdução

Este desafio simula funções de um sistema de contabilidade, focando na análise de dados financeiros associados a diferentes CPFs. As funções implementadas lidam com validação de dados, cálculos de saldos e médias, e identificação de registros específicos. 

## Funções Implementadas

### 1. `validarCPF(cpf)`

#### Descrição
Valida um número de CPF para garantir que é um número válido de 11 dígitos, verificando os dígitos verificadores.

#### Detalhes da Implementação
- **Validação do Comprimento**: Verifica se o CPF possui exatamente 11 dígitos.
- **Validação de CPF Repetido**: Verifica se todos os dígitos são iguais (ex: `11111111111`), o que é inválido.
- **Cálculo dos Dígitos Verificadores**:
  - Calcula o primeiro dígito verificador baseado nos primeiros 9 dígitos.
  - Calcula o segundo dígito verificador com base nos primeiros 10 dígitos.
  - Usa `parseInt` e `substring` para extrair e converter os dígitos necessários para o cálculo.
  - Compara os dígitos calculados com os fornecidos no CPF.

### 2. `validarEntradaDeDados(lancamento)`

#### Descrição
Valida um objeto de lançamento financeiro para garantir que o CPF e o valor estejam corretos.

#### Detalhes da Implementação
- **Validação do CPF**:
  - Verifica se o CPF contém apenas caracteres numéricos usando uma expressão regular (`/^\d+$/`).
  - Usa a função `validarCPF` para validar o CPF.
- **Validação do Valor**:
  - Garante que o valor seja numérico e esteja dentro dos limites permitidos (-2000 a 15000).
  - Retorna mensagens de erro se as validações falharem, ou `null` se todas as validações forem bem-sucedidas.

### 3. `recuperarSaldosPorConta(lancamentos)`

#### Descrição
Calcula o saldo total por CPF a partir de uma lista de lançamentos.

#### Detalhes da Implementação
- **Uso de `reduce`**:
  - Agrega os valores dos lançamentos por CPF.
  - Usa `Object.entries` e `map` para transformar o resultado em uma lista de objetos com CPF e saldo.
  
### 4. `recuperarMaiorMenorLancamentos(cpf, lancamentos)`

#### Descrição
Identifica os lançamentos com o maior e menor valor para um CPF específico.

#### Detalhes da Implementação
- **Filtragem**:
  - Filtra os lançamentos para o CPF fornecido.
- **Ordenação**:
  - Ordena os lançamentos do menor para o maior valor usando `sort`.
- **Seleção**:
  - Seleciona o menor e o maior lançamento, retornando-os em um array.

### 5. `recuperarMaioresSaldos(lancamentos)`

#### Descrição
Encontra os três CPFs com os maiores saldos totais.

#### Detalhes da Implementação
- **Uso de `recuperarSaldosPorConta`**:
  - Obtém os saldos totais por CPF.
- **Ordenação e Seleção**:
  - Ordena os saldos do maior para o menor usando `sort`.
  - Usa `slice` para limitar o resultado aos três maiores saldos.

### 6. `recuperarMaioresMedias(lancamentos)`

#### Descrição
Encontra os três CPFs com as maiores médias de valores lançados.

#### Detalhes da Implementação
- **Cálculo da Média**:
  - Usa `reduce` para somar e contar os lançamentos por CPF.
  - Calcula a média dos valores por CPF.
- **Ordenação e Seleção**:
  - Ordena os CPFs pelas médias do maior para o menor.
  - Usa `slice` para limitar o resultado aos três maiores valores médios.

## Exemplos de Teste

### Entradas

| CPF          | Valor    |
|--------------|----------|
| 74914372061  | 1234.78  |
| 74914372061  | -123.56  |
| 41421980096  | -987.00  |
| 05987701007  | 1267.39  |

### Saídas Esperadas

#### Saldo por CPF

| CPF          | Saldo    |
|--------------|----------|
| 74914372061  | 246.22   |
| 41421980096  | -2089.90 |
| 05987701007  | 1434.69  |

#### Maior e Menor Lançamento

| CPF          | Valor    |
|--------------|----------|
| 05987701007  | 23.40    |
| 05987701007  | 1267.39  |

#### Maiores Saldos

| CPF          | Saldo    |
|--------------|----------|
| 05987701007  | 1434.69  |
| 74914372061  | 246.22   |

#### Maiores Médias

| CPF          | Média    |
|--------------|----------|
| 05987701007  | 478.23   |
| 74914372061  | 82.07    |
