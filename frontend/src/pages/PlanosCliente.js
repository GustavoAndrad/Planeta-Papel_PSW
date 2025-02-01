import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos, planoSelectors } from "../redux/planoSlice";
import { fetchUsers, selectUser } from "../redux/usuarioSlice";

import SectionName from "../components/PedidosGerente/TitleSection"
import CardPlano from "../components/PlanosCliente/CardPlano"

function PlanosCliente(){
    const dispatch = useDispatch();

    const planos = useSelector(planoSelectors.selectAll);
    const planoStatus = useSelector((state) => state.planos.status);
    const [openCardId, setOpenCardId] = useState(null);

    const user = useSelector((state) => selectUser(state));
    const userStatus = useSelector((state) => state.planos.status);
    
    function handleCardClick(id){
        setOpenCardId(openCardId === id ? null : id);
    };

    // Consumindo informações
    useEffect(() => {
        if (planoStatus === "idle") {
            dispatch(fetchPlanos());
        }
        if (userStatus === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, planoStatus, userStatus]);

    // Lidar com estados de carregamento ou erro
    if (planoStatus === "pending" || userStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (planoStatus === "rejected") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do plano.</div>;
    }

    return(
        <>
            <SectionName sectionName={"Assinar Plano"} img={"/images/assinatura.png"}></SectionName>

            <div className="flex items-center gap-3 w-[300px]">
                <h1 className="text-2xl font-semibold text-secondaryBlue">📦 Plano Atual: </h1>
                <h1 className="text-2xl font-semibold">{user ? user.plano : 'Nenhum'}</h1>
            </div>
            
            {planos.map((item) => (
                <CardPlano 
                    key={item.id}
                    id={item.id}
                    name={item.nome} 
                    beneficios={item.beneficios} 
                    duracao={item.duracao} 
                    preco={item.preco} 
                    desconto={item.desconto}
                    isOpen={openCardId === item.id}
                    onClick={handleCardClick}
                    isSigned={user ? user.plano === item.nome: ''}
                />
            ))}
        </>
    );
}

export default PlanosCliente;
