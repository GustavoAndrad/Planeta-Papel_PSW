import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos, pedidoSelectors } from "../redux/pedidoSlice";
import { useEffect } from "react";
import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidoCliente() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const pedido = useSelector((state) => pedidoSelectors.selectById(state, id));
    const pedStatus = useSelector((state) => state.pedidos);

    useEffect(() => {
        if (pedStatus === "idle" || !pedido) {
            dispatch(fetchPedidos()); // Disparando a action para buscar os pedidos
        }
    }, [dispatch, pedStatus, pedido]);

    if (!pedido) {
        return <p>Pedido não encontrado.</p>;
    }

    const total = pedido.produtos.reduce((acc, prod) => acc + prod.preco, 0);
    return (
        <>
            <TitleSection sectionName={"Informações do Pedido"} img={"/images/check.png"} />
            <StrokeLine />
            <WhiteBox itemPedidos={pedido.produtos}/>
            <BoxResumo data={pedido.data} metodo={pedido.metodoPagamento} total={total} />
            <BotaoPedidos isCancelado={pedido.status === "cancelado"} pedido={pedido} />
        </>
    );
}

export default PedidoCliente;

