import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "../components/Pagamento/PaymentMethod";
import PixDetails from "../components/Pagamento/PixDetails";
import CreditCardDetails from "../components/Pagamento/CreditCardDetails";
import { carrinhoSelectors, deleteAllCarrinho, fetchCarrinho} from "../redux/carrinhoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdutos, selectProdutoByID } from "../redux/produtoSlice";
import { createPedido } from "../redux/pedidoSlice";
import { toast } from "react-toastify";

const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [pixDetailsVisible, setPixDetailsVisible] = useState(false);
  const [cartaoDetailsVisible, setCartaoDetailsVisible] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolder: "",
    installments: "1x",
  });

  const carrinho = useSelector(carrinhoSelectors.selectAll);
  const carrinhoStatus = useSelector(state => state.carrinho.status);
  const produtosId = carrinho.map(item=>item.prodId);
  const produtosSelecionados = useSelector(state => selectProdutoByID(state, produtosId));
  const prodStatus = useSelector(state => state.produtos.status);

  
  useEffect(()=>{
    if(carrinhoStatus === "idle"){
        dispatch(fetchCarrinho())
    }
    if(prodStatus === "idle"){
        dispatch(fetchProdutos()) 
    }
}, [dispatch, prodStatus, carrinhoStatus]);


  const toggleDetails = (type) => {
    if (type === "pix") {
      setPixDetailsVisible(!pixDetailsVisible);
      setCartaoDetailsVisible(false);
      setPaymentType("PIX")
    } else if (type === "cartao") {
      setCartaoDetailsVisible(!cartaoDetailsVisible);
      setPixDetailsVisible(false);
      setPaymentType("CARTAO")

    }
  };

  const itens = carrinho.map(item => {
    const produto = produtosSelecionados.find(prod => prod.id === item.prodId);
    
    if (produto) {
      return {
        prodId: produto.id,
        prodName: produto.nome,
        prodQt: item.qtd,
        prodTotal: (item.qtd * produto.preco).toFixed(2)
      };
    }
  
    return null; // Caso não encontre o produto correspondente
  }).filter(Boolean); // Remove os nulls, caso existam


  function formatarDataAtual() {
    const agora = new Date();
  
    const dia = String(agora.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); // getMonth() retorna de 0 a 11
    const ano = agora.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  const handlePagamento = (e)=>{
    e.preventDefault()

    const isPlanoPayment = localStorage.getItem("planoPayment")

    const userId = localStorage.getItem("id");

    if(paymentType==="CARTAO" && (cardData.cardNumber=== ""||
      cardData.expirationDate=== ""||
      cardData.cvv=== "" ||
      cardData.cardHolder=== "")){
        toast.error("Cartão inválido");
        return
      }

    if(paymentType){
      if(!isPlanoPayment){
      const pedido = {
        userId,
        prods: [...itens],
        date: formatarDataAtual(),
        met: paymentType,
        cardDetails: {isCard:(paymentType==="CARTAO"), ...cardData},
        isCancelado: false
      }
      dispatch(createPedido(pedido))
      navigate("/cliente/pedidos")
      toast.success("Pedido realizado!");
      dispatch(deleteAllCarrinho());
    }else{
      localStorage.removeItem("planoPayment")
      navigate("/cliente/pedidos")
      toast.success("Plano assinado com sucesso!");  
    }
    }
  }

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
        {pixDetailsVisible && <PixDetails handlePagamento={handlePagamento}/>}
      </PaymentMethod>

      <PaymentMethod label="Cartão de Crédito" id="cartao" onClick={() => toggleDetails("cartao")}>
        {cartaoDetailsVisible && 
          <CreditCardDetails
            cardData={cardData}
            setCardData={setCardData}
            handlePagamento={handlePagamento}
          />}
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


