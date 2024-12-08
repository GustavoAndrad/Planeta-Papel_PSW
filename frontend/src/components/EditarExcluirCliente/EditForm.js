import BotaoAzul from '../BotaoAzul';
import { useState } from 'react';

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
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    neighborhood,
    address,
    complement,
    cep,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ''
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value.trim() !== '') {
      setErrorMessage('');
    }

    if (onChange) onChange(event);
  };

  const handleSaveClick = () => {
    if (isFormValid) {
      onSaveClick(formData);
    } else {
      setErrorMessage('Todos os campos precisam estar preenchidos.');
    }
  };

  return (
    <form>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="text"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="text"
        name="complement"
        value={formData.complement}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />
      <input
        type="text"
        name="cep"
        value={formData.cep}
        onChange={handleInputChange}
        className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}

      <BotaoAzul
        text="Salvar"
        onClick={handleSaveClick}
        type="button"
      />
    </form>
  );
}
