import React, { useState } from 'react';

const CreditCardDetails = ({ cardData, setCardData, handlePagamento }) => {
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setCardData({ ...cardData, [field]: value });
  };

  return (
    <div id="cartao-details">
      <p className="text-[#1D437A] font-semibold mb-2">
        Bandeiras aceitas:
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
      <form>
        <input
          type="text"
          placeholder="Número do cartão"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardData.cardNumber}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
        />
        <input
          type="text"
          placeholder="Data de vencimento"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardData.expirationDate}
          onChange={(e) => handleChange("expirationDate", e.target.value)}
        />
        <input
          type="text"
          placeholder="CVV"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardData.cvv}
          onChange={(e) => handleChange("cvv", e.target.value)}
        />
        <input
          type="text"
          placeholder="Nome no cartão"
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4 pl-4"
          value={cardData.cardHolder}
          onChange={(e) => handleChange("cardHolder", e.target.value)}
        />
        <select
          className="border border-[#1D437A] p-2 rounded-[20px] w-full mb-4"
          value={cardData.installments}
          onChange={(e) => handleChange("installments", e.target.value)}
        >
          <option>1x</option>
          <option>2x</option>
        </select>
        {/* Exibir a mensagem de erro se algum campo não estiver preenchido */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-[#2A56ED] text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
          onClick={handlePagamento}
        >
          Confirmar Dados
        </button>
      </form>
    </div>
  );
};

export default CreditCardDetails;

