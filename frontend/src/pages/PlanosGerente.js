import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos } from "../redux/planoSlice";

import SectionName from "../components/PedidosGerente/TitleSection"
import Botao from "../components/PlanosGerente/BotaoPedidos"
import CardPlano from "../components/PlanosGerente/CardPlano"

function PlanosGerente(){
    const dispatch = useDispatch();

    const {planos, status:planoStatus} = useSelector(state=> state.planos);
    const [openCardId, setOpenCardId] = useState(null);

    function handleCardClick(id){
        setOpenCardId(openCardId === id ? null : id);
    };
    // Consumindo informações
    useEffect(() => {
        if (planoStatus === "idle") {
            console.log(111)
            dispatch(fetchPlanos());
        }
    }, [dispatch, planoStatus]);

    // Lidar com estados de carregamento ou erro
    if (planoStatus === "loading") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (planoStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do plano.</div>;
    }

    return(
        <>
            <SectionName sectionName={"Gerenciar Planos"} img={"/images/assinatura.png"}></SectionName>
            <Botao text={"Adicionar plano"}></Botao>
            
            {planos.map((item) => {
                return (
                    <CardPlano 
                        key={item.id}
                        id={item.id}
                        name={item.nome} beneficios={item.beneficios} duracao={item.duracao} preco={item.preco} desconto={item.desconto}
                        isOpen={openCardId === item.id}
                        onClick={handleCardClick}
                    ></CardPlano>
                )
            })}
        </>
    )
}

export default PlanosGerente