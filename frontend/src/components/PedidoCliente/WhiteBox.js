import ItemPedido from "./ItemPedido";
import SheetStroke from "./SheetStroke";

import { useDispatch, useSelector } from "react-redux";
import { fetchProdutos, produtoSelectors } from "../../redux/produtoSlice";
import { useEffect } from "react";

function WhiteBox({ itemPedidos }) {

    const dispatch = useDispatch();
    
    const produtos = useSelector(produtoSelectors.selectAll);
    const prodStatus = useSelector((state) => state.produtos.status);
    
    // Consumindo informações
    useEffect(() => {
      if (prodStatus === "idle") {
        dispatch(fetchProdutos());
      }
    }, [dispatch, prodStatus]);

    return (
        <div className="w-full h-fit min-w-[300px] mt-5 flex flex-col justify-center pl-6 bg-white">
            {itemPedidos.map((item, index) => {
                // Encontrar o produto correspondente pelo ID
                const produto = produtos.find((prod) => String(prod.nome) === String(item.nome));
                const imagem = produto ? produto.imagem[0] : '';
                
                return (
                    <>
                        <ItemPedido
                            nome={item.nome} 
                            qt={item.quantidade} 
                            total={item.preco} 
                            key={`${item.id}-${index}`}
                            imagem={imagem} 
                        />
                        <SheetStroke isWhiteBox={true} />
                    </>
                );
            })}
        </div>
    );
}

export default WhiteBox;
