//import { useState } from "react";
import CarrinhoCard from "../components/CarrinhoCard";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


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
                    <button type='button' className="flex p-3 w-full justify-center text-xl font-semibold bg-white text-primaryBlue rounded-full border-2 border-primaryBlue shadow-md hover:bg-secondaryBlue hover:text-white hover:border-accentBlue">
                    Continuar Comprando</button>
                </div>
            </Link>
            <div className="mt-6">
                <a href="./conf_pedido.html" className="flex p-3 w-full justify-center text-xl font-semibold bg-primaryBlue text-white rounded-full hover:bg-secondaryBlue shadow-md">Confirmar Pedido</a>
            </div>
            </>)}

            {totalCar <= 0 &&(<>
            <div className="flex items-center justify-center mt-6">
                <h1 className="text-2xl font-semibold text-cancelRed">Não há itens no Carrinho</h1>
            </div>
            <Link to="/catalogo">
                <div className="mt-6">
                    <button type='button' className="flex p-3 w-full justify-center text-xl font-semibold bg-white text-primaryBlue rounded-full border-2 border-primaryBlue shadow-md hover:bg-secondaryBlue hover:text-white hover:border-accentBlue">
                        Continuar Comprando</button>
                </div>
            </Link>
            </>)}

        </>)

}

export default Carrinho;