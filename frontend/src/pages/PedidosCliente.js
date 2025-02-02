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

    return (
        <>
            {/* Título da seção */}
            <TitleSection sectionName={"Pedidos realizados"} img={"/images/pedido.png"} />
            <StrokeLine />
            
            {/* Estado de carregamento */}
            {status === "pending" && <p>Carregando pedidos...</p>}
            
            {/* Lista de pedidos */}
            {status === "fulfilled" && pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                    <Pedido
                        key={pedido.id}
                        cancelled={pedido.status === "cancelado"}
                        data={pedido.data} 
                        valor={pedido.total}
                        cliente={pedido.userId}
                        onClick={() => handlePedidoClick(pedido.id)}
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



