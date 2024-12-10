import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/usuarioSlice';
import InputField from '../InputField';
import BotaoAzul from '../BotaoAzul';

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, email, telefone, bairro, endereco, cep, senha } = formData;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !telefone || !bairro || !endereco || !cep || !senha) {
      setError('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Despacha a ação para criar o usuário no estado com o campo plano como null
      await dispatch(createUser(formData)).unwrap();
      console.log('Usuário cadastrado com sucesso!');
      navigate('/login'); // Redireciona para a tela de login após o cadastro
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
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
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
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
        />
        <InputField
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <BotaoAzul text={loading ? 'Cadastrando...' : 'Cadastrar'} type="submit" disabled={loading} />
      </form>
    </div>
  );
};

export default CustomerForm;
