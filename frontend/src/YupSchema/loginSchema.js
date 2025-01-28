import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string().min(4, "A senha deve ter pelo menos 4 caracteres").required("Senha é obrigatória"),
});
  
export const loginRestrictValidationSchema = Yup.object({
    cpf: Yup.string().min(14, "Formato de CPF inválido").required("CPF é obrigatório"),
    securityCode: Yup.string().min(5, "Formato de código inválido").required("Código é obrigatório")
});