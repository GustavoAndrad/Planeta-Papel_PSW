import { useState } from 'react'
import Box from '../components/Solicitacao/Box';
import BoxResultado from '../components/Solicitacao/BoxResultado';
import TitleSection from '../components/PedidosGerente/TitleSection';

const info = {
    solicitaçao:{
        cliente: "NomeNome",
        items:[
            {nome:"Folhas/Cadernos", qtd:"20 und"},
            {nome:"Cartolina", qtd:"2kg"}
        ],
        outros:[
            {nome:"Jornal",qtd:"30 und"},
            {nome:"Jornal",qtd:"30 und"}
        ],
        modalidade: "Coleta Residencial",
        data: "xx/xx/xxxx"
    }
}

function formatSectionName(name){
    return name.padEnd(34, '.');
}

export default function AnalisarSolic(){
    const [status, setStatus] = useState(null);
    
    return(<>
        <TitleSection sectionName={formatSectionName("Analisar Solicitação")} img="/images/reciclagem.png"></TitleSection>
        
        <div className="px-4 pb-4">
            <Box info={info.solicitaçao} type={1}></Box>
            <BoxResultado status={status} setStatus={setStatus}></BoxResultado>
        </div>
    </>)
}