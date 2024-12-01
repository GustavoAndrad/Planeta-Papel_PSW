import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos, planoSelectors } from "../redux/planoSlice";
import { Link } from "react-router-dom";

import SectionName from "../components/PedidosGerente/TitleSection"
import CardPlano from "../components/PlanosGerente/CardPlano"
import BotaoAzul from "../components/BotaoAzul";

function PlanosGerente(){
    const dispatch = useDispatch();

    const planos = useSelector(planoSelectors.selectAll);
    const planoStatus = useSelector((state) => state.planos.status);
    const [openCardId, setOpenCardId] = useState(null);

    function handleCardClick(id){
        setOpenCardId(openCardId === id ? null : id);
    };
    // Consumindo informações
    useEffect(() => {
        if (planoStatus === "idle") {
            dispatch(fetchPlanos());
        }
    }, [dispatch, planoStatus]);

    // Lidar com estados de carregamento ou erro
    if (planoStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (planoStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do plano.</div>;
    }

    return(
        <>
            <SectionName sectionName={"Gerenciar Planos"} img={"/images/assinatura.png"}></SectionName>
            <Link to="/gerente/criar-plano">
                <BotaoAzul type={"button"} text={"Adicionar plano"}></BotaoAzul>
            </Link>
            
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