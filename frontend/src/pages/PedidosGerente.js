import StrokeLine from "../components/Catalogo/StrokeLine";
import Barra from "../components/PedidosGerente/Barra";
import Pedido from "../components/PedidosGerente/Pedido";
import SearchBar from "../components/PedidosGerente/SearchBar";
import SectionName from "../components/PedidosGerente/SectionName";

function PedidosGerente(){
    return (
        <>
        <SectionName sectionName={"Pedidos realizados"} img={"/images/pedido.png"}></SectionName>
        <SearchBar></SearchBar>
        <StrokeLine></StrokeLine>
        <SectionName sectionName={"Agosto de 2024......................"} img={"/images/prod.png"}></SectionName>
        <Pedido cancelled={true} data={"27/08/2024"} valor={"123,00"}></Pedido>
        <Pedido cancelled={false} data={"24/08/2024"} valor={"123,00"}></Pedido>
        <Pedido cancelled={false} data={"14/08/2024"} valor={"123,00"}></Pedido>
        <StrokeLine></StrokeLine>
        <SectionName sectionName={"Junho de 2024..............."} img={"/images/prod.png"}></SectionName>
        <Pedido cancelled={false} data={"24/08/2024"} valor={"123,00"}></Pedido>
        <Pedido cancelled={true} data={"14/08/2024"} valor={"123,00"}></Pedido>
        <StrokeLine></StrokeLine>
        <Barra></Barra>
        </>
    )
}

export default PedidosGerente;