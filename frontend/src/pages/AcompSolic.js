import Box from "../components/Solicitacao/Box";
import TitleSection from "../components/PedidosGerente/TitleSection";
import BotaoRetorno from "../components/BotaoRetorno";
import { useParams, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchSolicitacoes, solicSelectors} from "../redux/solicitacoesSlice"

function formatSectionName(name){
    return name.padEnd(34, '.');
}

export default function AcompSolic(){
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
        <TitleSection sectionName={formatSectionName("Acompanhar Solicitação")} img="/images/reciclagem.png"></TitleSection>
        
        <div className="px-4 pb-4">
            <Box info={solic} type={1}></Box>
            {solic.analise ? <Box info={solic} type={2}></Box> : 
            <h1 className="text-2xl font-semibold text-cancelRed">A análise ainda não ocorreu</h1>}
        </div>
        
        <p className="text-sm font-semibold text-center">
            Se houver problemas na coleta, entraremos em contato.<br/>
            Nosso meio de comunicação é o correio eletrônico.
        </p>
    </>)
}