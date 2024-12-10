import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { pedidoSelectors } from "../redux/pedidoSlice";
import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidoCliente() {
    const { id } = useParams();
    const pedido = useSelector((state) => pedidoSelectors.selectById(state, id));

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
            <BotaoPedidos isCancelar={false} />
        </>
    );
}

export default PedidoCliente;
