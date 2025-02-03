import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updatePedido } from "../../redux/pedidoSlice";
import { fetchProdutos, produtoSelectors, updateQuickProduto } from "../../redux/produtoSlice";
import { toast } from "react-toastify";
import { fetchPlanos, planoSelectors } from "../../redux/planoSlice";

function BotaoPedidos({isCancelado, pedido}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isGerente/*, setIsGerente*/] = useState(() => localStorage.getItem("gerente"));
    const redirect = (isGerente==="true") ? "/gerente/pedidos":"/cliente/pedidos";
    
    const produtos = useSelector(produtoSelectors.selectAll);
    const prodStatus = useSelector((state) => state.produtos.status);

    const planos = useSelector(planoSelectors.selectAll);
    const planoStatus = useSelector((state) => state.planos.status);
    
    // Consumindo informações
    useEffect(() => {
      if (prodStatus === "idle") {
        dispatch(fetchProdutos());
      }
    }, [dispatch, prodStatus]);

    useEffect(() => {
        if (planoStatus === "idle") {
            dispatch(fetchPlanos()); // Disparando a action para buscar os planos
        }
    }, [planoStatus, dispatch]);

    const handleCancel = async (e) => {
        e.preventDefault();

        planos.forEach( async (p)=>{
            if(p.nome === pedido.produtos[0].nome){

                let newPedido = { ...pedido }; 
                newPedido.status = "cancelado";

                await dispatch(updatePedido(newPedido));
                navigate(`/gerente/pedidos`);
                window.location.reload();

                return
            }
        })

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Cancelar pedido? Isso extornará a compra.")) {
    
            let newPedido = { ...pedido }; 
            newPedido.status = "cancelado";
    
            // Atualizando a quantidade dos produtos no estoque
            for (let produto of newPedido.produtos) {
                const p = produtos.find((prod) => String(prod.nome) === String(produto.nome));
    
                if (p) {  // Verifique se o produto foi encontrado
                    const produtoData = {
                        qntDisponivel: p.qntDisponivel + produto.quantidade
                    };
        
                    // Chamar a API para atualizar a quantidade do produto
                    await dispatch(updateQuickProduto({ id:p.id, produtoData })); // Passando os dados corretamente
                }
            }

            toast.info("Estoque atualizado.")
    
            // Atualizando o status do pedido
            await dispatch(updatePedido(newPedido));
            navigate(`/gerente/pedidos`);
            window.location.reload();
        }
    };
    
    const handleRevoke = async (e) => {
        e.preventDefault();

        planos.forEach( async (p)=>{
            if(p.nome === pedido.produtos[0].nome){

                let newPedido = { ...pedido }; 
                newPedido.status = "pendente";

                await dispatch(updatePedido(newPedido));
                navigate(`/gerente/pedidos`);
                window.location.reload();

                return
            }
        })

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Revogar cancelamento? Isso fará a cobrança novamente.")) {
    
            let newPedido = { ...pedido }; 
            newPedido.status = "pendente";

            for (let produto of newPedido.produtos) {
                const p = produtos.find((prod) => String(prod.nome) === String(produto.nome));
    
                if (p) {
                    const produtoData = {
                        qntDisponivel: p.qntDisponivel - produto.quantidade
                    };
            
                    await dispatch(updateQuickProduto({ id: p.id, produtoData }));
                }
            }
    
            toast.info("Estoque atualizado.");
    
            // Atualizando o status do pedido
            await dispatch(updatePedido(newPedido));
            navigate(`/gerente/pedidos`);
            window.location.reload();
        }
    };
    

    return (
        <>
            <Link to={redirect}>
                <button className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-primaryBlue text-white w-full rounded-full">Ver todos os pedidos</button>
            </Link>

            {(!isCancelado && isGerente==="true") ? (
                <button onClick={handleCancel} className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-red-500 text-white w-full rounded-full">Cancelar compra</button>
            ) : null}

            {(isCancelado && isGerente==="true") ? (
                <button onClick={handleRevoke} className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-red-500 text-white w-full rounded-full">Revogar cancelamento</button>
            ) : null}
        </>
    );
}

export default BotaoPedidos;
