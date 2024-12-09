import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSolicitacoes, solicSelectors } from "../redux/solicitacoesSlice";

import SectionName from "../components/PedidosGerente/TitleSection"
import CardSolic from "../components/SolicGerente/CardSolic"

export default function SolicGerente(){
    const dispatch = useDispatch();

    const solic = useSelector(solicSelectors.selectAll);
    const solicStatus = useSelector((state) => state.solicitacoes.status);
    const [openCardId, setOpenCardId] = useState(null);

    const handleCardClick = useCallback((id) => {
        setOpenCardId(openCardId === id ? null : id);
    }, [openCardId]);

    // Consumindo informações
    useEffect(() => {
        if (solicStatus === "idle") {
            dispatch(fetchSolicitacoes());
        }
    }, [dispatch, solicStatus]);

    // Lidar com estados de carregamento ou erro
    if (solicStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (solicStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações das Solicitacoes.</div>;
    }

    return(
        <>
            <SectionName sectionName={"Gerenciar Solicitacoes"} img={"/images/reciclagem.png"}></SectionName>

            {solic.map((item) => {
                return (
                    <CardSolic
                        key={item.id}
                        id={item.id}
                        cliente={item.cliente}
                        isOpen={openCardId === item.id}
                        onClick={handleCardClick}
                    />
                )
            })}
        </>
    )
}