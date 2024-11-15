import StrokeLine from "../components/Catalogo/StrokeLine";
import BoxResumo from "../components/PedidoCliente/BoxResumo";
import WhiteBox from "../components/PedidoCliente/WhiteBox";
import BotaoPedidos from "../components/PedidosGerente/BotaoPedidos";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidoCliente() {

    const items = [{prodName: "PRODUTO 1", prodQt: 12, prodTotal: "123"},
        {prodName: "PRODUTO 2", prodQt: 12, prodTotal: "123"},
        {prodName: "PRODUTO 3", prodQt: 12, prodTotal: "123"}
    ];

    return(
        <>
            <TitleSection sectionName={"Informações do Pedido"} img={"/images/check.png"} />
            <StrokeLine />
            <WhiteBox itemPedidos={items}>
            </WhiteBox>
            <BoxResumo data={"11/11/1111"} metodo={"PIX"} total={"123,00"}></BoxResumo>
            <BotaoPedidos isCancelar={false}></BotaoPedidos>
        </>
    );
}

export default PedidoCliente;