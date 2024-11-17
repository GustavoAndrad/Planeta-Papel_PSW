
function formatSectionName(name,num){
    return name.padEnd(num, '.');
}

export default function Box({info, type}){
    console.log(info)
    return(<>
        <div className={`${(type === 1)? "":"invisible h-0"}`}>
            <h1 class="text-xl font-semibold">Resumo da Solicitação</h1>
            <div class="mt-3 mb-5 p-3 bg-white ">
                <p class="text-lg font-semibold border-b-red-400 border-b-2">Cliente: <span class="text-lg font-semibold text-secondaryBlue">{info.cliente}</span></p>
                <p class="text-lg font-semibold mt-2">Itens: 
                    <ul class="pl-5 list-disc text-lg text-secondaryBlue  border-b-red-400 border-b-2">
                        
                        {info.items?.map((item)=>{
                            if(item.nome!=="Outro"){
                                return <li className="font-mono">{formatSectionName(item.nome,22)}{item.qtd}</li>
                            }else{
                                return<>
                                    <li className="font-mono">Outro:</li>
                                    <ul className="list-disc pl-5">
                                        {item.outros.map((item)=>
                                            <li className="font-mono">{formatSectionName(item.nome,20)}{item.qtd}</li>)}
                                    </ul>
                                </>
                            }
                        })}
                    </ul>
                </p>
                <p class="text-lg font-semibold border-b-red-400 border-b-2 mt-2">Modalidade: <span class="text-lg font-semibold text-secondaryBlue">{info.modalidade}</span></p>
                <p class="text-lg font-semibold mt-2">Solicitado em: <span class="text-lg font-semibold text-secondaryBlue">{info.data}</span></p>
            </div>
        </div>

        <div className={`${(type === 2)? "":"invisible h-0"}`}>
            <h1 class="text-xl font-semibold">Resultado da Análise</h1>
            <div class="mt-3 p-3 bg-white ">
                <p class="text-lg font-semibold border-b-red-400 border-b-2">Realizado em: <span class="text-lg font-semibold text-secondaryBlue">{info.data}</span></p>
                <p class="text-lg font-semibold border-b-red-400 border-b-2 mt-2">Status: <span class={`text-lg font-semibold ${info.status? "text-primaryBlue":"text-cancelRed"}`}>{info.status? "APROVADO":"NÃO APROVADO"}</span></p>
                <p class="text-lg font-semibold mt-2">Data limite para Coleta: <span class="text-lg font-semibold text-secondaryBlue">{info.dataLimite}</span>
                    <br/><a class="text-sm font-semibold">
                        O horário padrão é SEMPRE de 10:00 às 18:00
                    </a>
                </p>
            </div>
        </div>
    </>)
}