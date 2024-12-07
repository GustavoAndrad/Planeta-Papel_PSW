import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../components/Pagamento/PaymentMethod";
import PixDetails from "../components/Pagamento/PixDetails";
import CreditCardDetails from "../components/Pagamento/CreditCardDetails";

const PaymentPage = () => {
  const [pixDetailsVisible, setPixDetailsVisible] = useState(false);
  const [cartaoDetailsVisible, setCartaoDetailsVisible] = useState(false);

  const navigate = useNavigate();

  const toggleDetails = (type) => {
    if (type === "pix") {
      setPixDetailsVisible(!pixDetailsVisible);
    } else if (type === "cartao") {
      setCartaoDetailsVisible(!cartaoDetailsVisible);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main className="pt-4 pb-4 pl-6 pr-6 min-h-[100vh] h-auto max-w-full bg-gray-100">
      <div className="flex items-center mb-6">
        <img
          src="../images/economizar.png"
          alt="Mão com Dinheiro"
          className="w-11 h-11 mr-2 transform scale-x-[-1]"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold" style={{ color: "#2A5EAD" }}>
            Pagamento
          </h1>
          <h2 className="text-md" style={{ color: "#2A5EAD" }}>
            Escolha o método que preferir
          </h2>
        </div>
      </div>

      <PaymentMethod label="Pix" id="pix" onClick={() => toggleDetails("pix")}>
        {pixDetailsVisible && <PixDetails />}
      </PaymentMethod>

      <PaymentMethod label="Cartão de Crédito" id="cartao" onClick={() => toggleDetails("cartao")}>
        {cartaoDetailsVisible && <CreditCardDetails />}
      </PaymentMethod>

      <div className="bg-white shadow-md rounded-[20px] p-4 mt-4 mb-2" style={{ borderColor: "#1D437A" }}>
        <p className="text-center text-[#2A5EAD] font-semibold mb-2">
          Assim que o pagamento é confirmado, seu pedido é concluído. =)
        </p>
        <p className="text-center text-[#828282] mt-2">Aguarde, te avisaremos quando estiver tudo feito...</p>
        <p className="text-center text-[#828282] mt-2">Em caso de dúvida, ligue para +55 021 1234-5678</p>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleGoHome}
          className="bg-[#2A56ED] text-white py-2 px-6 rounded-full font-bold text-lg"
        >
          Voltar para a Home
        </button>
      </div>
    </main>
  );
};

export default PaymentPage;


