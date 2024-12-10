import * as Yup from 'yup';

const solicValidationSchema = Yup.object({
  cliente: Yup.string()
    .required('ID do cliente é obrigatório'),

  items: Yup.array()
    .of(
      Yup.object({
        nome: Yup.string()
          .required('Nome do item é obrigatório'),
        qtd: Yup.string()
          .required('Quantidade do item é obrigatória'),
      })
    )
    .min(1, 'A solicitação deve ter pelo menos 1 item')
    .required('Itens são obrigatórios'),

  outros: Yup.array()
    .of(
      Yup.object({
        nome: Yup.string()
          .required('Nome do item extra é obrigatório'),
        qtd: Yup.string()
          .required('Quantidade do item extra é obrigatória'),
      })
    )
    .notRequired()
    .nullable(),

  modalidade: Yup.string()
    .oneOf(['Coleta Residencial', 'Coleta na Loja'], 'Modalidade inválida')
    .required('Modalidade é obrigatória'),

  data: Yup.string()
    .required('Data é obrigatória'),
});

export default solicValidationSchema;