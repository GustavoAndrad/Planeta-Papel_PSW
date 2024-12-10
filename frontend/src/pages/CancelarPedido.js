import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectPedidoById, deletePedido } from "../redux/pedidoSlice";
import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";

function CancelarPedido() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pedido = useSelector((state) => selectPedidoById(state, id));

    if (!pedido) {
        return <p>Pedido não encontrado.</p>;
    }

    const total = pedido.prods.reduce((acc, prod) => acc + parseFloat(prod.prodTotal), 0);

    const handleCancelarPedido = async () => {
        try {
            await dispatch(deletePedido(id)).unwrap();
            alert("Pedido cancelado com sucesso!");
            navigate("/pedidos");
        } catch (error) {
            console.error("Erro ao cancelar o pedido:", error);
            alert("Erro ao cancelar o pedido. Tente novamente.");
        }
    };

    return (
        <>
            <TitleSection sectionName={"Cancelar Pedido"} img={"/images/cancel.png"} />
            <StrokeLine />
            <WhiteBox itemPedidos={pedido.prods} />
            <BoxResumo data={pedido.date} metodo={pedido.met} total={total} />
            {/* Botão para Cancelar Pedido */}
            <BotaoPedidos isCancelar={true} onClick={handleCancelarPedido} />
        </>
    );
}

export default CancelarPedido;

