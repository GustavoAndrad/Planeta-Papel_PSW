import { Link } from "react-router-dom";
import { useState } from "react";
import Caixa from "../components/Solicitacao/SolicRecic/Caixa";
import CaixaMod from "../components/Solicitacao/SolicRecic/CaixaMod";
import BotaoAzul from "../components/BotaoAzul";


const startItems = [
    {nome:"Folhas/Cadernos", qtd:""},
    {nome:"Cartolina", qtd:""},
    {nome:"Post-it", qtd:""}
]
const startOutros = [
    {nome: "", qtd:""}
]

function formatSectionName(name){
    return name.padEnd(34, '.');
}

export default function SolicReciclagem(){

    const [items, setItems] = useState(startItems);
    const [outros, setOutros] = useState(startOutros);

    const [isCheck, setIsCheck]=useState([false,false,false]);
    const toggleCheck = (index) => {
        setIsCheck((prev) => {
            const newChecks = [...prev];  
            newChecks[index] = !newChecks[index];  
            return newChecks;  
        });
    };

    const [isCheckMod, setIsCheckMod]=useState(null);
    const toggleCheckMod = (value) => {
        setIsCheckMod(isCheckMod === value ? null : value);
    };

    return(
        <>
            <div className="flex items-center mb-6 gap-3">
                <img src="/images/reciclagem.png" alt="" className="size-8"/>
                <span>
                    <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Solicitar Reciclagem")}</h1>
                    <p className="text-sm font-semibold text-primaryBlue">Essa ação está sujeita  à validação</p>
                </span>
            </div>
            <Caixa 
                items={items}
                setItems={setItems}
                outros={outros}
                setOutros={setOutros}
                isCheck={isCheck} 
                toggleCheck={toggleCheck} 
            />
            <CaixaMod 
                isCheckMod={isCheckMod} 
                toggleCheckMod={toggleCheckMod} 
            />
            <Link to="/cliente/acompanhar">
                <BotaoAzul text={"Confirmar"}/>
            </Link>

        </>
    )
}