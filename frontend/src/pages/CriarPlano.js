import InfoPlano from "../components/CriarEditarPlano/InfoPlano";
import { useState } from "react";

function formatSectionName(name){
    return name.padEnd(34, '.');
}

const startPlano = {
    nome: "", 
    custo: "", 
    duracao: "", 
    beneficios: [""]
}

export default function CriarPlano(){
    const [plano,setPlano] = useState(startPlano)

    return(<>
        <div class="flex items-center mb-6 gap-3">
            <img src="/images/assinatura.png" alt="" class="size-8"/>
            <span>
                <h1 class="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Criar Plano de Assinatura")}</h1>
            </span>
        </div>
        
        <InfoPlano plano={plano} setPlano={setPlano} type={1}></InfoPlano>

    </>)
}