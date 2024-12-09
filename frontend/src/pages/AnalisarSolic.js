import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchSolicitacoes, solicSelectors} from "../redux/solicitacoesSlice"

import Box from '../components/Solicitacao/Box';
import BoxResultado from '../components/Solicitacao/BoxResultado';
import TitleSection from '../components/PedidosGerente/TitleSection';
import BotaoRetorno from '../components/BotaoRetorno';

function formatSectionName(name){
    return name.padEnd(34, '.');
}


export default function AnalisarSolic(){
    const {id} = useParams();
    const dispatch = useDispatch();

    const solic = useSelector(state => solicSelectors.selectById(state, id));
    const solicStatus = useSelector((state) => state.solicitacoes.status);
    useEffect(() => {
        if (solicStatus === "idle") {
        dispatch(fetchSolicitacoes());
        }
    }, [solicStatus, dispatch]);

    // Lidar com estados de carregamento ou erro
    if (solicStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (solicStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações da Solicitação.</div>;
    }
    
    if (!solic) {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Solicitação não encontrada.</div>;
    }

    return(<>
        <Link to="/cliente/solicitacoes">
            <BotaoRetorno/>
        </Link>
        <TitleSection sectionName={formatSectionName("Analisar Solicitação")} img="/images/reciclagem.png"/>
        
        <div className="px-4 pb-4">
            <Box info={solic} type={1}/>
            <BoxResultado solicitacaoId={id}/>
        </div>
    </>)
}