import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSolicitacoes, selectSolicitacoesByCliente } from "../redux/solicitacoesSlice";
import { Link } from "react-router-dom";

import SectionName from "../components/PedidosGerente/TitleSection"
import CardSolicC from "../components/SolicCliente/CardSolicC"
import BotaoAzul from "../components/BotaoAzul";

export default function SolicCliente(){
    const dispatch = useDispatch();
    const cliente = localStorage.getItem("id");
    const solic = useSelector((state)=>selectSolicitacoesByCliente(state,cliente));
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
            <SectionName sectionName={"Ver Solicitacoes"} img={"/images/reciclagem.png"}></SectionName>
            <Link to="/cliente/solicitar">
                <BotaoAzul type={"button"} text={"Nova Solicitação"}/>
            </Link>

            {solic.map((item) => {
                return (
                    <CardSolicC
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