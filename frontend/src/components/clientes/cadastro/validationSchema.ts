import * as Yup from "yup";

const msgCampoObrigatorio = "Campo Obrigatório";

const campoObrigatórioValidation = Yup.string()
  .trim()
  .required(msgCampoObrigatorio);

export const validationScheme = Yup.object().shape({
  cpf: campoObrigatórioValidation.length(14, "CPF Inválido!"),
  dataNascimento: campoObrigatórioValidation.length(10, "Data Inválida!"),
  email: campoObrigatórioValidation.email("Email Inválido!"),
  endereco: campoObrigatórioValidation,
  nome: campoObrigatórioValidation,
  telefone: campoObrigatórioValidation,
});
