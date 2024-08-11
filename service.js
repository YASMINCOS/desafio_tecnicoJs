const validarCPF = (cpf) => {
   let sum = 0;
   let resto;

   if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

   for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
   resto = (sum * 10) % 11;

   if (resto === 10 || resto === 11) resto = 0;
   if (resto !== parseInt(cpf.substring(9, 10))) return false;

   sum = 0;
   for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
   resto = (sum * 10) % 11;

   if (resto === 10 || resto === 11) resto = 0;
   return resto === parseInt(cpf.substring(10, 11));
};

const validarEntradaDeDados = (lancamento) => {
   const { cpf, valor } = lancamento;

   if (!/^\d+$/.test(cpf)) return "CPF deve conter apenas caracteres numéricos.";
   if (!validarCPF(cpf)) return "Os dígitos verificadores do CPF são inválidos.";
   if (typeof valor !== 'number' || isNaN(valor)) return "Valor deve ser numérico.";
   if (valor > 15000) return "Valor não pode ser superior a 15000,00.";
   if (valor < -2000) return "Valor não pode ser inferior a -2000,00.";

   return null;
};

const recuperarSaldosPorConta = (lancamentos) => {
   const saldos = lancamentos.reduce((acc, { cpf, valor }) => {
       acc[cpf] = (acc[cpf] || 0) + valor;
       return acc;
   }, {});

   return Object.entries(saldos).map(([cpf, valor]) => ({ cpf, valor }));
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   const lancamentosDoCPF = lancamentos.filter(l => l.cpf === cpf);
   if (lancamentosDoCPF.length === 0) return [];

   lancamentosDoCPF.sort((a, b) => a.valor - b.valor);

   const menor = lancamentosDoCPF[0];
   const maior = lancamentosDoCPF[lancamentosDoCPF.length - 1];

   return [menor, maior];
};

const recuperarMaioresSaldos = (lancamentos) => {
   const saldos = recuperarSaldosPorConta(lancamentos);

   saldos.sort((a, b) => b.valor - a.valor);

   return saldos.slice(0, 3);
};

const recuperarMaioresMedias = (lancamentos) => {
   const medias = lancamentos.reduce((acc, { cpf, valor }) => {
       if (!acc[cpf]) acc[cpf] = { soma: 0, count: 0 };
       acc[cpf].soma += valor;
       acc[cpf].count += 1;
       return acc;
   }, {});

   const result = Object.entries(medias).map(([cpf, { soma, count }]) => ({
       cpf,
       valor: soma / count
   }));

   result.sort((a, b) => b.valor - a.valor);

   return result.slice(0, 3);
};
