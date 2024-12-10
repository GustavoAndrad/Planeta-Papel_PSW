import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPedidos, pedidoSelectors } from "../redux/pedidoSlice";
import { useNavigate } from "react-router-dom";
import StrokeLine from "../components/Catalogo/StrokeLine";
import Pedido from "../components/PedidosGerente/Pedido";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidosCliente() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userId] = useState(() => localStorage.getItem("id"));
    const pedidos = useSelector(pedidoSelectors.selectAll);
    const status = useSelector((state) => state.pedidos.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPedidos());
        }
    }, [status, dispatch]);

    // Função para lidar com o clique em um pedido
    const handlePedidoClick = (pedidoId) => {
        navigate(`/informacoes-pedido/${pedidoId}`); // Navega para a rota com o ID do pedido
    };


    const pedidosUser = pedidos.filter((pedido) => pedido.userId === userId);

    return (
        <>
            {/* Título da seção */}
            <TitleSection sectionName={"Pedidos realizados"} img={"/images/pedido.png"} />
            <StrokeLine />
            
            {/* Estado de carregamento */}
            {status === "pending" && <p>Carregando pedidos...</p>}
            
            {/* Lista de pedidos */}
            {status === "fulfilled" && pedidos.length > 0 ? (
                pedidosUser.map((pedido) => (
                    <Pedido
                        key={pedido.id}
                        cancelled={pedido.isCancelado} // Ajuste conforme necessário (Exemplo: verificar se o pedido foi cancelado)
                        data={pedido.date} // Data do pedido
                        valor={pedido.prods.reduce((acc, prod) => acc + parseFloat(prod.prodTotal), 0)} // Soma dos valores dos produtos
                        onClick={() => handlePedidoClick(pedido.id)} // Passa a função de clique
                    />
                ))
            ) : (
                // Mensagem quando não há pedidos
                <p>Nenhum pedido encontrado.</p>
            )}

      <div className="bg-white shadow-md rounded-[20px] p-4 mt-4 mb-2" style={{ borderColor: "#1D437A" }}>
        <p className="text-center text-[#2A5EAD] font-semibold mb-2">
          Assim que o pagamento é confirmado seus pedidos são concluídos =)
        </p>
        <p className="text-center text-[#828282] mt-2">Em caso de dúvida ou cancelamento, ligue para +55 021 1234-5678</p>
      </div>
        </>
    );
}

export default PedidosCliente;



