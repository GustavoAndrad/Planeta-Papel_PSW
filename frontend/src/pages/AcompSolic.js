import Box from "../components/Solicitacao/Box";
import TitleSection from "../components/PedidosGerente/TitleSection";

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
    },
    analise:{
        data: "xx/xx/xxxx",
        status: true,
        dataLimite: "xx/xx/xxxx"
    }

}

function formatSectionName(name){
    return name.padEnd(34, '.');
}

export default function AcompSolic(){
    return(<>
        <TitleSection sectionName={formatSectionName("Acompanhar Solicitação")} img="/images/reciclagem.png"></TitleSection>
        
        <div className="px-4 pb-4">
            <Box info={info.solicitaçao} type={1}></Box>
            <Box info={info.analise} type={2}></Box>
        </div>
        
        <p className="text-sm font-semibold text-center">
            Se houver problemas na coleta, entraremos em contato.<br/>
            Nosso meio de comunicação é o correio eletrônico.
        </p>
    </>)
}