import * as Yup from 'yup';

const produtoValidationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("O nome do produto é obrigatório.")
      .min(3, "O nome deve ter pelo menos 3 caracteres."),
    preco: Yup.number()
      .required("O preço é obrigatório.")
      .min(0.1, "O preço deve ser maior que zero."),
    qntDisponivel: Yup.number()
      .required("A quantidade é obrigatória.")
      .integer("A quantidade deve ser um número inteiro.")
      .min(0, "A quantidade deve ser maior ou igual a zero."),
    descricao: Yup.string()
      .required("A descrição é obrigatória.")
      .min(10, "A descrição deve ter pelo menos 10 caracteres."),
    categoria: Yup.string()
      .required("A categoria é obrigatória."),
  });

export default produtoValidationSchema;