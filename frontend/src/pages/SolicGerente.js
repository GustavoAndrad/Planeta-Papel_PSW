import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSolicitacoes, solicSelectors } from "../redux/solicitacoesSlice";
import { fetchAllUsers, userSelectors} from "../redux/usuarioSlice"

import SectionName from "../components/PedidosGerente/TitleSection"
import CardSolic from "../components/SolicGerente/CardSolic"

export default function SolicGerente(){
    const dispatch = useDispatch();

    const solic = useSelector(solicSelectors.selectAll);
    const solicStatus = useSelector((state) => state.solicitacoes.status);

    const users = useSelector(userSelectors.selectAll);
    const userStatus = useSelector((state) => state.users.status);

    const [openCardId, setOpenCardId] = useState(null);

    const handleCardClick = useCallback((id) => {
        setOpenCardId(openCardId === id ? null : id);
    }, [openCardId]);

    // Consumindo informações
    useEffect(() => {
        if (solicStatus === "idle") {
            dispatch(fetchSolicitacoes());
        } if (userStatus === "idle") {
            dispatch(fetchAllUsers())
        }
    }, [dispatch, solicStatus, userStatus]);

    // Lidar com estados de carregamento ou erro
    if (solicStatus === "pending" || userStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (solicStatus === "failed" || userStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações das Solicitacoes.</div>;
    }

    return(
        <>
            <SectionName sectionName={"Gerenciar Solicitacoes"} img={"/images/reciclagem.png"}></SectionName>

            {solic.map((item) => {
                
                const user = users.find((u) => u.id === item.cliente);

                return (
                    <CardSolic
                        key={item.id}
                        id={item.id}
                        cliente={user ? users.find((u) => u.id === item.cliente).nome + " (" + user.email + ")": "Recarregue a página para ver os nomes"}
                        isOpen={openCardId === item.id}
                        onClick={handleCardClick}
                    />
                )
            })}
        </>
    )
}