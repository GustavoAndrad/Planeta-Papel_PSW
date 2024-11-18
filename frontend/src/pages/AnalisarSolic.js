import { useState } from 'react'
import Box from '../components/Solicitacao/Box';
import BoxResultado from '../components/Solicitacao/BoxResultado';

const info = {
    solicitaçao:{
        cliente: "NomeNome",
        items:[
            {nome:"Folhas/Cadernos", qtd:"20 und"},
            {nome:"Cartolina", qtd:"2kg"},
            {nome:"Outro", outros:[
                {nome:"Jornal",qtd:"30 und"},
                {nome:"Jornal",qtd:"30 und"}
            ]}
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
        <div class="flex items-center mb-6 gap-3">
            <img src="/images/reciclagem.png" alt="" class="size-8"/>
            <span>
                <h1 class="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Analisar Solicitação")}</h1>
            </span>
        </div>

        <div class="px-4 pb-4">
            <Box info={info.solicitaçao} type={1}></Box>
            <BoxResultado status={status} setStatus={setStatus}></BoxResultado>
        </div>
    </>)
}