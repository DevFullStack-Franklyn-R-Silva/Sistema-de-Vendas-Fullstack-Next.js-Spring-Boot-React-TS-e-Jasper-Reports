export const converterEmBigDecimal = (value: any): number => {
  if (!value) {
    return 0;
  }

  // Remover apenas os pontos
  const cleanedValue = value.replace(/\./g, "");

  // Substituir a vírgula por ponto como separador decimal
  const numericValue = cleanedValue.replace(",", ".");

  // Converter para número e garantir duas casas decimais
  return parseFloat(numericValue);
};

export const formatReal = (valor: any) => {
  const cleanedValue = valor.replace(/\D/g, "");

  // Verificar se cleanedValue tem pelo menos 3 dígitos
  if (cleanedValue.length < 3) {
    return "0,00"; // Ou qualquer valor padrão desejado
  }

  const v = ((cleanedValue / 100).toFixed(2) + "").split(".");

  const m = v[0]
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g);

  // Verificar se m não é null antes de prosseguir
  if (m === null) {
    return "0,00"; // Ou qualquer valor padrão desejado
  }

  for (let i = 0; i < m.length; i++) {
    m[i] = m[i].split("").reverse().join("") + ".";
  }
  const r = m.reverse().join("");

  return r.substring(0, r.lastIndexOf(".")) + "," + v[1];
};
