import React, { useState } from 'react';
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
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phone, neighborhood, address, zipCode } = formData;
    if (!fullName || !email || !phone || !neighborhood || !address || !zipCode) {
      setError('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    setError('');
    console.log('Cadastro realizado com sucesso:', formData);
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

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <BotaoAzul text="Cadastrar" type="submit" />
      </form>
    </div>
  );
};

export default CustomerForm;
