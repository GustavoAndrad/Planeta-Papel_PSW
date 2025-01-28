import * as Yup from 'yup';

const userValidationSchema = Yup.object({
    nome: Yup.string()
      .required('Nome é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'O nome não pode ter mais de 100 caracteres'),
  
    email: Yup.string()
      .required('E-mail é obrigatório')
      .email('E-mail inválido'),
  
    telefone: Yup.string()
      .required('Telefone é obrigatório')
      .matches(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        'Telefone inválido. O formato correto é (XX) XXXXX-XXXX'
      ),  
    bairro: Yup.string()
      .required('Bairro é obrigatório')
      .min(3, 'O bairro deve ter pelo menos 3 caracteres')
      .max(50, 'O bairro não pode ter mais de 50 caracteres'),
  
    endereco: Yup.string()
      .required('Endereço é obrigatório')
      .min(3, 'O endereço deve ter pelo menos 3 caracteres')
      .max(150, 'O endereço não pode ter mais de 150 caracteres'),
  
    complemento: Yup.string()
      .max(100, 'O complemento não pode ter mais de 100 caracteres')
      .optional(), // Complemento não é obrigatório
  
    cep: Yup.string()
      .required('CEP é obrigatório')
      .matches(
        /^\d{5}-\d{3}$/,
        'CEP inválido. O formato correto é XXXXX-XXX'
      ),
  });

export default userValidationSchema;