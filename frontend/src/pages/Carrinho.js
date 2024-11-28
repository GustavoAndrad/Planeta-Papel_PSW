//import { useState } from "react";
import CarrinhoCard from "../components/CarrinhoCard";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import BotaoAzul from "../components/BotaoAzul";
import BotaoBranco from "../components/BotaoBranco";


function formatSectionName(name){
    return name.padEnd(34, '.');
}


function Carrinho(){
    const carrinho = useSelector(state=> state.carrinho);
    const totalCar = carrinho.reduce((total, item) => total + item.prodPrice * item.qtd, 0);
    
    return(
        <>
            
            <div className="flex items-center mb-6 gap-3">
                <img src="images/carrinho.png" alt="" className="size-8"/>
                <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Carrinho")}</h1>
            </div>
            
            {carrinho.map((produto)=>(
                <CarrinhoCard 
                    key={produto.id} 
                    id={produto.id} 
                    />
            ))}
            
            {totalCar > 0 &&(<>
            <div className="flex items-center justify-center mt-6">
                <h1 className="text-2xl font-semibold text-secondaryBlue">
                    Total ...................... R$ {totalCar.toFixed(2)}
                </h1>
            </div>
            <Link to="/catalogo">
                <div className="mt-6">
                    <BotaoBranco type={"button"} text={"Continuar Comprando"}></BotaoBranco>
                </div>
            </Link>
            <Link to="/catalogo">
                <div className="mt-6">
                    <BotaoAzul text={"Confirmar Pedido"}></BotaoAzul>
                </div>
            </Link>
            </>)}

            {totalCar <= 0 &&(<>
            <div className="flex items-center justify-center mt-6">
                <h1 className="text-2xl font-semibold text-cancelRed">Não há itens no Carrinho</h1>
            </div>
            <Link to="/catalogo">
                <div className="mt-6">
                    <BotaoBranco type={"button"} text={"Continuar Comprando"}></BotaoBranco>
                </div>
            </Link>
            </>)}

        </>)

}

export default Carrinho;