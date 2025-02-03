import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPedidos, pedidoSelectors } from "../redux/pedidoSlice";
import { useNavigate } from "react-router-dom";
import StrokeLine from "../components/Catalogo/StrokeLine";
import Pedido from "../components/PedidosGerente/Pedido";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidosGerente() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pedidos = useSelector(pedidoSelectors.selectAll);
    const status = useSelector((state) => state.pedidos.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchAllPedidos());
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
                pedidos.map((pedido, index) => (
                    <Pedido
                        key={pedido.id+index}
                        cancelled={pedido.status === "cancelado"}
                        data={pedido.data}
                        valor={pedido.total}
                        cliente={pedido.userId}
                        onClick={() => handlePedidoClick(pedido.id)} // Passa a função de clique
                    />
                ))
            ) : (
                // Mensagem quando não há pedidos
                <p>Nenhum pedido encontrado.</p>
            )}
        </>
    );
}

export default PedidosGerente;



