import React from 'react';
import InputField from '../InputField';
import BotaoAzul from '../BotaoAzul';

export default function EditForm({
  name,
  email,
  phone,
  neighborhood,
  address,
  complement,
  cep,
  onSaveClick,
  onChange,
}) {
  const handleSave = () => {
    onSaveClick({
      name,
      email,
      phone,
      neighborhood,
      address,
      complement,
      cep,
    });
  };

  return (
    <form>
      <InputField
        type="text"
        name="name"
        placeholder="Nome Completo"
        value={name}
        onChange={onChange}
      />
      <InputField
        type="email"
        name="email"
        placeholder="E-mail"
        value={email}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="phone"
        placeholder="Telefone"
        value={phone}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="neighborhood"
        placeholder="Bairro"
        value={neighborhood}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="address"
        placeholder="Endereço"
        value={address}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="complement"
        placeholder="Complemento"
        value={complement}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="cep"
        placeholder="CEP"
        value={cep}
        onChange={onChange}
      />
      <BotaoAzul text="Salvar" onClick={handleSave} type="button" />
    </form>
  );
}
