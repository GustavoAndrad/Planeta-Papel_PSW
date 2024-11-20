import { Link } from "react-router-dom";
import Botao from "../components/Solicitacao/SolicRecic/Botao"
import Caixa from "../components/Solicitacao/SolicRecic/Caixa";

const items = [
    "Folhas/Cadernos",
    "Cartolina",
    "Post-it",
    "Outro"
]


function formatSectionName(name){
    return name.padEnd(34, '.');
}

export default function SolicReciclagem(){

    return(
        <>
            <div className="flex items-center mb-6 gap-3">
                <img src="/images/reciclagem.png" alt="" className="size-8"/>
                <span>
                    <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Solicitar Reciclagem")}</h1>
                    <p className="text-sm font-semibold text-primaryBlue">Essa ação está sujeita  à validação</p>
                </span>
            </div>
            <Caixa sectionName={"O que vai reciclar ?"} items={items} type={"rec"}></Caixa>
            <Caixa sectionName={"Modalidade da Coleta"} items={["Coletar no meu endereço","Vou levar à loja"]} type={"mod"}></Caixa>
            <Link to="/cliente/acompanhar">
                <Botao text={"Confirmar"}></Botao>
            </Link>

        </>
    )
}