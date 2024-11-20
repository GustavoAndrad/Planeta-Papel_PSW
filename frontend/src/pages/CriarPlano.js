import InfoPlanoCriar from "../components/CriarEditarPlano/InfoPlanoCriar";

function formatSectionName(name){
    return name.padEnd(34, '.');
}


export default function CriarPlano(){

    return(<>
        <div class="flex items-center mb-6 gap-3">
            <img src="/images/assinatura.png" alt="" class="size-8"/>
            <span>
                <h1 class="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Criar Plano de Assinatura")}</h1>
            </span>
        </div>
        
        <InfoPlanoCriar></InfoPlanoCriar>

    </>)
}