import { useNavigate } from "react-router-dom"; // Para redirecionamento
import StrokeLine from "../components/Catalogo/StrokeLine";
import Barra from "../components/PedidosGerente/Barra";
import Pedido from "../components/PedidosGerente/Pedido";
import SearchBar from "../components/PedidosGerente/SearchBar";
import TitleSection from "../components/PedidosGerente/TitleSection";

function PedidosGerente() {
    const navigate = useNavigate(); // Hook para navegação

    // Função para ir para a tela de informações do pedido
    const handlePedidoClick = (pedidoId) => {
        navigate(`/informacoes-pedido/${pedidoId}`);
    };

    return (
        <>
            <TitleSection sectionName={"Pedidos realizados"} img={"/images/pedido.png"}></TitleSection>
            <SearchBar></SearchBar>
            <StrokeLine></StrokeLine>
            <TitleSection sectionName={"Agosto de 2024......................"} img={"/images/prod.png"}></TitleSection>
            <Pedido
                cancelled={true}
                data={"27/08/2024"}
                valor={"123,00"}
                onClick={() => handlePedidoClick(1)} // Passa o ID do pedido (exemplo: 1)
            ></Pedido>
            <Pedido
                cancelled={false}
                data={"24/08/2024"}
                valor={"123,00"}
                onClick={() => handlePedidoClick(2)} // Passa o ID do pedido (exemplo: 2)
            ></Pedido>
            <Pedido
                cancelled={false}
                data={"14/08/2024"}
                valor={"123,00"}
                onClick={() => handlePedidoClick(3)} // Passa o ID do pedido (exemplo: 3)
            ></Pedido>
            <StrokeLine></StrokeLine>
            <TitleSection sectionName={"Junho de 2024..............."} img={"/images/prod.png"}></TitleSection>
            <Pedido
                cancelled={false}
                data={"24/08/2024"}
                valor={"123,00"}
                onClick={() => handlePedidoClick(4)} // Passa o ID do pedido (exemplo: 4)
            ></Pedido>
            <Pedido
                cancelled={true}
                data={"14/08/2024"}
                valor={"123,00"}
                onClick={() => handlePedidoClick(5)} // Passa o ID do pedido (exemplo: 5)
            ></Pedido>
            <StrokeLine></StrokeLine>
            <Barra></Barra>
        </>
    );
}

export default PedidosGerente;
