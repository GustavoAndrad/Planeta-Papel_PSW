import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers, userSelectors} from "../redux/usuarioSlice"
import SectionName from "../components/PedidosGerente/TitleSection"
import CardCliente from "../components/ClientesView/CardCliente";

export default function ClientesView(){
    const dispatch = useDispatch();

    const users = useSelector(userSelectors.selectAll);
    const userStatus = useSelector((state) => state.users.status);

    const [openCardId, setOpenCardId] = useState(null);

    const handleCardClick = useCallback((id) => {
        setOpenCardId(openCardId === id ? null : id);
    }, [openCardId]);

    // Consumindo informações
    useEffect(() => {
        if (userStatus === "idle") {
            dispatch(fetchAllUsers())
        }
    }, [dispatch,userStatus]);

    // Lidar com estados de carregamento ou erro
    if (userStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (userStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações de usuários</div>;
    }

    if (users.length===0) {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10 text-center">Erro ao carregar informações. <br/>Experimente recarregar a página</div>;
    }

    return(
        <>
            <SectionName sectionName={"Ver Dados de Clientes"} img={"/images/cadastro.png"}></SectionName>
            
            {users.map((user)=>{
                return <CardCliente 
                            id={user.id}
                            nome={user.nome}
                            email={user.email}
                            telefone={user.telefone}
                            cep={user.cep}
                            isOpen={openCardId === user.id}
                            onClick={handleCardClick}
                        ></CardCliente>
            })}
            
        </>
    )
}