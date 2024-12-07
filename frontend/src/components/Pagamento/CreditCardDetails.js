import React, { useState } from 'react';

const CreditCardDetails = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [installments, setInstallments] = useState('1x');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !expirationDate || !cvv || !cardHolder) {
      setError('Por favor, preencha todos os campos do cartão de crédito!');
      return;
    }

    setError('');

    console.log('Formulário enviado com sucesso');
  };

  return (
    <div id="cartao-details">
      <p className="text-[#1D437A] font-semibold mb-2">
        Bandeiras aceitas:{" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
          alt="Visa"
          className="inline w-8 h-8 mx-1"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          alt="Mastercard"
          className="inline w-8 h-8 mx-1"
        />
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Número do cartão"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Data de vencimento"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="CVV"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome no cartão"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />

        <div className="relative mb-4">
          <select
            id="parcelas-select"
            className="appearance-none border border-[#1D437A] p-2 rounded-[20px] w-full pr-8"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
          >
            <option>Parcelas</option>
            <option>1x</option>
            <option>2x</option>
          </select>

          <svg
            id="parcelas-arrow"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1D437A] pointer-events-none transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 8l5 5 5-5H7z" />
          </svg>
        </div>

        {/* Exibir a mensagem de erro se algum campo não estiver preenchido */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-[#2A56ED] text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
        >
          Confirmar Dados
        </button>
      </form>
    </div>
  );
};

export default CreditCardDetails;

