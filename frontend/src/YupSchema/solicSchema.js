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
    ),

  outros: Yup.array()
    .of(
      Yup.object({
        nome: Yup.string()
          .min(3,"Material inválido")
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
}).test('at-least-one', 'A solicitação deve conter pelo menos um item em "items" ou "outros"', function (values) {
  const hasItems = values.items && values.items.length > 0;
  const hasOutros = values.outros && values.outros.length > 0;
  return hasItems || hasOutros;
  });

export default solicValidationSchema;