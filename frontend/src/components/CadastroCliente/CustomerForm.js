import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/usuarioSlice';
import InputField from '../InputField';
import BotaoAzul from '../BotaoAzul';
import userValidationSchema from '../../YupSchema/userSchema';
import { toast } from "react-toastify";
import { mascaraCEP, mascaraTelefone } from '../../Mascaras';


const CustomerForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    bairro: '',
    endereco: '',
    complemento: '',
    cep: '',
    isGerente: false,
    plano: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;

    switch(name){
      case "telefone":
        value = mascaraTelefone(value); 
        break; 
      case "cep":
        value = mascaraCEP(value);
        break;
      default:
    }

    const updatedData = {
      ...formData,
      [name]: value
    };

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      await userValidationSchema.validate(formData, { abortEarly: false });
      if(!formData.senha || formData.senha.lengh<5){
        throw new Error("Senha deve ser válida!")
      }
    } catch(e){
      e.inner.forEach((err) => {
        toast.error(`${err.message}`);
      });
      return
    }

    setError('');
    setLoading(true);

    formData.plano = null;

    try {
      // Despacha a ação para criar o usuário no estado com o campo plano como null
      const {status, message} = await dispatch(createUser(formData)).unwrap();

      if(status){
        toast.success("Cadastro bem sucedido!")
        navigate('/login'); // Redireciona para a tela de login após o cadastro
      } else{
        toast.error(message)
      }
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
      toast.error("Falha ao cadastrar")
      setError('Houve um problema ao cadastrar o usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6" style={{ borderColor: '#1D437A' }}>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="nome"
          placeholder="Nome Completo"
          value={formData.nome}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          maxLength={15}
        />
        <InputField
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="complemento"
          placeholder="Complemento"
          value={formData.complemento}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="cep"
          placeholder="CEP"
          value={formData.cep}
          onChange={handleChange}
          maxLength={9}
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <BotaoAzul text={loading ? 'Cadastrando...' : 'Cadastrar'} type="submit" disabled={loading} />
      </form>
    </div>
  );
};

export default CustomerForm;
