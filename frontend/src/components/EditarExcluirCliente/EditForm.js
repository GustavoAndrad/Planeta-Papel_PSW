import React from 'react';
import InputField from '../InputField';
import BotaoAzul from '../BotaoAzul';

export default function EditForm({
  nome,
  email,
  telefone,
  bairro,
  endereco,
  complemento,
  cep,
  onSaveClick,
  onChange,
}) {
  const handleSave = () => {
    onSaveClick({
      nome,
      email,
      telefone,
      bairro,
      endereco,
      complemento,
      cep
    });
  };

  return (
    <form>
      <InputField
        type="text"
        name="nome"
        placeholder="Nome Completo"
        value={nome}
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
        name="telefone"
        placeholder="Telefone"
        value={telefone}
        onChange={onChange}
        maxLength={15}
      />
      <InputField
        type="text"
        name="bairro"
        placeholder="Bairro"
        value={bairro}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="endereco"
        placeholder="Endereço"
        value={endereco}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="complemento"
        placeholder="Complemento"
        value={complemento}
        onChange={onChange}
      />
      <InputField
        type="text"
        name="cep"
        placeholder="CEP"
        value={cep}
        onChange={onChange}
        maxLength={9}
      />
      <BotaoAzul text="Salvar" onClick={handleSave} type="button" />
    </form>
  );
}
