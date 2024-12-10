import * as Yup from 'yup';

const planoValidationSchema = Yup.object({ 
    nome: Yup.string()
      .required('Nome do plano é obrigatório')
      .min(3, 'O nome do plano deve ter pelo menos 3 caracteres')
      .max(100, 'O nome do plano não pode ter mais de 100 caracteres'),
  
    preco: Yup.number()
      .required('Preço é obrigatório')
      .positive('O preço deve ser um valor positivo')
      .min(0.01, 'O preço deve ser maior que zero'),
  
    duracao: Yup.number()
      .required('Duração é obrigatória')
      .integer('A duração deve ser um número inteiro')
      .positive('A duração deve ser um número positivo')
      .min(1, 'A duração deve ser pelo menos 1 dia'),
  
    desconto: Yup.number()
      .optional()
      .positive('O desconto deve ser um valor positivo')
      .max(100, 'O desconto não pode ser maior que 100'),
  
    beneficios: Yup.array()
      .of(Yup.string().required('Benefício não pode estar vazio'))
      .min(1, 'O plano deve ter pelo menos 1 benefício')
      .required('Benefícios são obrigatórios'),
  });
export default planoValidationSchema;