import React from "react";

function formatSectionName(name,num){
    return name.padEnd(num, '.');
}

export default function Box({info, type}){
    if(type === 1){//gerente
        return(<>
            <h1 className="text-xl font-semibold">
                Resumo da Solicitação
            </h1>
            <div className="mt-3 mb-5 p-3 bg-white ">
                <p className="text-lg font-semibold border-b-red-400 border-b-2">
                    Cliente: <span className="text-lg font-semibold text-secondaryBlue">{info.cliente}</span>
                </p>

                <p className="text-lg font-semibold mt-2">
                    Itens: </p>
                <ul className="pl-5 list-disc text-lg text-secondaryBlue  border-b-red-400 border-b-2">
                    
                    {info.items?.map((item, index)=>{
                        return <li key={`item-${index}`} className="font-mono">{formatSectionName(item.nome,20)}{item.qtd}</li>
                    })}
                    <li className="font-mono">Outro:</li>
                        <ul key={`sublist`} className="list-disc pl-5">
                            {info.outros?.map((item, subIndex)=>
                                <li key={`subitem-${subIndex}`} className="font-mono">{formatSectionName(item.nome,18)}{item.qtd}</li>)}
                        </ul>
                </ul>
                
                <p className="text-lg font-semibold border-b-red-400 border-b-2 mt-2">
                    Modalidade: <span className="text-lg font-semibold text-secondaryBlue">{info.modalidade}</span></p>
                <p className="text-lg font-semibold mt-2">
                    Solicitado em: <span className="text-lg font-semibold text-secondaryBlue">{info.data}</span></p>
            </div>
        </>)
    }else{//cliente
        return(<>
            <h1 className="text-xl font-semibold">Resultado da Análise</h1>
            <div className="mt-3 p-3 bg-white ">
                <p className="text-lg font-semibold border-b-red-400 border-b-2">Realizado em: <span className="text-lg font-semibold text-secondaryBlue">{info.data}</span></p>
                <p className="text-lg font-semibold border-b-red-400 border-b-2 mt-2">Status: <span className={`text-lg font-semibold ${info.status? "text-primaryBlue":"text-cancelRed"}`}>{info.status? "APROVADO":"NÃO APROVADO"}</span></p>
                <p className="text-lg font-semibold mt-2">Data limite para Coleta: <span className="text-lg font-semibold text-secondaryBlue">{info.dataLimite}</span>
                    <br/><a className="text-sm font-semibold">
                        O horário padrão é SEMPRE de 10:00 às 18:00
                    </a>
                </p>
            </div>
        </>)
    }
}