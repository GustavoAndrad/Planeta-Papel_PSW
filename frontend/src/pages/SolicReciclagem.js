import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { createSolicitacao } from "../redux/solicitacoesSlice"
import { useDispatch } from "react-redux";

import Caixa from "../components/Solicitacao/SolicRecic/Caixa";
import CaixaMod from "../components/Solicitacao/SolicRecic/CaixaMod";
import BotaoAzul from "../components/BotaoAzul";
import BotaoRetorno from "../components/BotaoRetorno";


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
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function handleSubmit(e){
        e.preventDefault();

        if (!isCheckMod) {
            alert("Por favor, selecione uma modalidade de coleta.");
            return; // Não envia a solicitação se a modalidade não estiver selecionada
        }
        
        const invalidItems = items.filter(item => {
            return isCheck[items.indexOf(item)] && (!item.qtd || item.qtd.trim() === "");
        });
        if (invalidItems.length > 0) {
            alert("Por favor, preencha a quantidade de todos os itens selecionados.");
            return; // Não envia a solicitação se algum item não estiver preenchido corretamente
        }

        const invalidOutros = outros.filter(item => !item.nome.trim() || !item.qtd.trim());
        if (invalidOutros.length > 0) {
            alert("Por favor, preencha o nome e a quantidade de todos os itens 'Outros'.");
            return; // Não envia a solicitação se algum item 'Outro' não estiver preenchido corretamente
        }

        const ultimoItem = outros[outros.length - 1];        
        const outrosValidados = ultimoItem.nome !== "" ? outros : outros.slice(0, outros.length - 1);

        const newSolicitacao = {  
            cliente: localStorage.getItem("id"),
            items: items.filter((_, index) => isCheck[index]),
            outros: outrosValidados.map(item => ({ nome: item.nome, qtd: item.qtd })),
            modalidade: isCheckMod,
            data: new Date().toLocaleDateString("pt-BR"),  
        };
    
        dispatch(createSolicitacao(newSolicitacao));
    
        navigate('/cliente/solicitacoes/');
    };

    return(
        <>
            <Link to="/cliente/solicitacoes">
                <BotaoRetorno/>
            </Link>
            <div className="flex items-center mb-6 gap-3">
                <img src="/images/reciclagem.png" alt="" className="size-8"/>
                <span>
                    <h1 className="text-2xl font-semibold text-secondaryBlue">Solicitar Reciclagem</h1>
                    <p className="text-sm font-semibold text-primaryBlue">Essa ação está sujeita  à validação</p>
                </span>
                <div className="w-full h-full border-b-4 border-dotted border-secondaryBlue text-transparent"></div>
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
            <BotaoAzul text={"Confirmar"} onClick={handleSubmit}/>
        </>
    )
}