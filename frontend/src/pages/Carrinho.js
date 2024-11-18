import { useState } from "react";
import CarrinhoCard from "../components/CarrinhoCard";
import { Link } from 'react-router-dom';

const ProdutoList = [
      { id:1, prodName: "Produto A", prodPrice: 10.50 },
      { id:2, prodName: "Produto B", prodPrice: 10 },
      { id:3, prodName: "Produto C", prodPrice: 15.30 },
      { id:4, prodName: "Produto D", prodPrice: 12.99 },
      { id:5, prodName: "Produto E", prodPrice: 8.75 },
      { id:6, prodName: "Produto F", prodPrice: 22.40 },
      { id:7, prodName: "Produto G", prodPrice: 5.60 }
]



function formatSectionName(name){
    return name.padEnd(34, '.');
}

const startTotalCar = ProdutoList.reduce((acc,produto)=>(acc+produto.prodPrice),0);

function Carrinho(){
    const [prodList, setProdList] = useState(ProdutoList);
    const [totalCar, setTotalCar] = useState(startTotalCar);
    

    return(
        <>
            
            <div className="flex items-center mb-6 gap-3">
                <img src="images/carrinho.png" alt="" className="size-8"/>
                <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Carrinho")}</h1>
            </div>
            
            {prodList.map((produto)=>(
                <CarrinhoCard key={produto.id} produto={produto} prodList={prodList} setProdList={setProdList} totalCar={totalCar} setTotalCar={setTotalCar}/>
            ))}
            
            {totalCar > 0 &&(<>
            <div className="flex items-center justify-center mt-6">
                <h1 className="text-2xl font-semibold text-secondaryBlue">Total ...................... R$ {totalCar.toFixed(2)}</h1>
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