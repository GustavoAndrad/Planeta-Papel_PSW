import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/usuarioSlice';
import InputField from '../InputField';
import BotaoAzul from '../BotaoAzul';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    neighborhood: '',
    address: '',
    complement: '',
    zipCode: '',
    password: '',
    isGerente: false,
    plano: null,  // O valor inicial do plano é null
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

    const { fullName, email, phone, neighborhood, address, zipCode, password } = formData;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!fullName || !email || !phone || !neighborhood || !address || !zipCode || !password) {
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
          name="fullName"
          placeholder="Nome Completo"
          value={formData.fullName}
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
          name="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="neighborhood"
          placeholder="Bairro"
          value={formData.neighborhood}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="address"
          placeholder="Endereço"
          value={formData.address}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="complement"
          placeholder="Complemento"
          value={formData.complement}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="zipCode"
          placeholder="CEP"
          value={formData.zipCode}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <BotaoAzul text={loading ? 'Cadastrando...' : 'Cadastrar'} type="submit" disabled={loading} />
      </form>
    </div>
  );
};

export default CustomerForm;
