import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchCarrinho, carrinhoSelectors } from "../redux/carrinhoSlice";
import { fetchProdutos, selectProdutoByID } from '../redux/produtoSlice';

import CarrinhoCard from "../components/CarrinhoCard";
import BotaoAzul from "../components/BotaoAzul";
import BotaoBranco from "../components/BotaoBranco";


function formatSectionName(name){
    return name.padEnd(34, '.');
}

function Carrinho(){
    const dispatch = useDispatch();

    // Informações consumidas
    const carrinho = useSelector(carrinhoSelectors.selectAll);
    const carrinhoStatus = useSelector(state => state.carrinho.status);

    const produtosId = carrinho.map(item=>item.prodId);
    const produtosSelecionados = useSelector(state => selectProdutoByID(state, produtosId));
    const prodStatus = useSelector(state => state.produtos.status);

    // Funcionamento do Carrinho
    const produtosIndexados = useMemo(() => {
        if(produtosSelecionados.length >0 ){
            return produtosSelecionados.reduce((acc, produto) => {
                acc[produto.id] = produto;
                return acc;
            }, {});
        }
    }, [ produtosSelecionados]);
     
    const totalCar = useMemo(() => {
        if( produtosSelecionados.length >0 ){ 
            return carrinho.reduce((total, item) => {
                const produto = produtosIndexados[item.prodId];
                return total + produto.preco * item.qtd;
            }, 0);
        }
    }, [carrinho, produtosIndexados, produtosSelecionados]); 
  
    useEffect(()=>{
        if(carrinhoStatus === "idle"){
            dispatch(fetchCarrinho())
        }
        if(prodStatus === "idle"){
            dispatch(fetchProdutos())
        }
    }, [dispatch, prodStatus, carrinhoStatus]);

      // Lidar com estados de carregamento ou erro
    if (prodStatus === "pending" || carrinhoStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (prodStatus === "failed" || carrinhoStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do carrinho.</div>;
    }

    return(
        <>

            <div className="flex items-center mb-6 gap-3">
                <img src="images/carrinho.png" alt="" className="size-8"/>
                <h1 className="text-2xl font-semibold text-secondaryBlue">{formatSectionName("Carrinho")}</h1>
            </div>
            
            {carrinho.map((item)=>(
                <CarrinhoCard 
                    key={item.id}
                    ParamQtd={item.qtd}
                    id={item.id} 
                    produto={produtosIndexados[item.prodId]}
                    dispatch={dispatch}
                    />
            ))}
            
            {carrinho.length > 0 &&(<>
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
            <Link to="/pagamento">
                <div className="mt-6">
                    <BotaoAzul text={"Confirmar Pedido"}></BotaoAzul>
                </div>
            </Link>
            </>)}

            {carrinho.length === 0 &&(<>
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