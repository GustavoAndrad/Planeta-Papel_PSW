import Box from "../components/Solicitacao/Box";

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
        <div className="flex items-center mb-6 gap-3">
            <img src="/images/reciclagem.png" alt="" className="size-8"/>
            <span>
                <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Acompanhar Solicitação")}</h1>
            </span>
        </div>
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