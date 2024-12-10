import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPedidos, pedidoSelectors } from "../redux/pedidoSlice";
import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";
import { useEffect } from "react";

function PedidoCliente() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const pedido = useSelector((state) => pedidoSelectors.selectById(state, id));
    const pedStatus = useSelector((state) => state.pedidos);

    useEffect(() => {
        if (pedStatus === "idle" || !pedido) {
          dispatch(fetchPedidos()); // Disparando a action para buscar os produtos
        }
      }, [dispatch, pedStatus, pedido]);

    if (!pedido) {
        return <p>Pedido não encontrado.</p>;
    }

    const total = pedido.prods.reduce((acc, prod) => acc + parseFloat(prod.prodTotal), 0);

    return (
        <>
            <TitleSection sectionName={"Informações do Pedido"} img={"/images/check.png"} />
            <StrokeLine />
            <WhiteBox itemPedidos={pedido.prods} />
            <BoxResumo data={pedido.date} metodo={pedido.met} total={total} />
            <BotaoPedidos isCancelado={pedido.isCancelado} pedido={pedido} />
        </>
    );
}

export default PedidoCliente;
