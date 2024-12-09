import { useParams } from "react-router-dom";
import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidoCliente() {

    //const items = [{prodName: "PRODUTO 1", prodQt: 12, prodTotal: "123"},
    //    {prodName: "PRODUTO 2", prodQt: 12, prodTotal: "123"},
    //    {prodName: "PRODUTO 3", prodQt: 12, prodTotal: "123"}
    //];

    //const { id } = useParams();
    //const info = useSelector((state) => pedidoSelectors.selectById(state, id))

    return(
        <>
            <TitleSection sectionName={"Informações do Pedido"} img={"/images/check.png"} />
            <StrokeLine />
            <WhiteBox itemPedidos={info.prods}>
            </WhiteBox>
            <BoxResumo data={info.date} metodo={info.met} total={info.tot}></BoxResumo>
            <BotaoPedidos isCancelar={false}></BotaoPedidos>
        </>
    );
}

export default PedidoCliente;