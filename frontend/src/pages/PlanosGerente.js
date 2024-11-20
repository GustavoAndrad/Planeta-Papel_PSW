import { useState } from "react";
import { useSelector } from "react-redux";
import SectionName from "../components/PedidosGerente/TitleSection"
import Botao from "../components/PlanosGerente/BotaoPedidos"
import CardPlano from "../components/PlanosGerente/CardPlano"

function PlanosGerente(){

    const planos = useSelector(state=> state.planos);
    const [openCardId, setOpenCardId] = useState(null);

    function handleCardClick(id){
        setOpenCardId(openCardId === id ? null : id);
    };

    return(
        <>
            <SectionName sectionName={"Gerenciar Planos"} img={"/images/assinatura.png"}></SectionName>
            <Botao text={"Adicionar plano"}></Botao>
            {planos.map((item) => {
                return (
                    <CardPlano 
                        key={item.id}
                        id={item.id}
                        name={item.nome} beneficios={item.beneficios} duracao={item.duracao} preco={item.preco}
                        isOpen={openCardId === item.id}
                        onClick={handleCardClick}
                    ></CardPlano>
                )
            })}
        </>
    )
}

export default PlanosGerente