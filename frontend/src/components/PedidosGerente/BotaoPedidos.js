import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updatePedido } from "../../redux/pedidoSlice";

function BotaoPedidos({isCancelado, pedido}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isGerente/*, setIsGerente*/] = useState(() => localStorage.getItem("gerente"));
    const redirect = (isGerente==="true") ? "/gerente/pedidos":"/cliente/pedidos";

    const handleCancel = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Cancelar pedido? Isso extornará a compra.")) {

          let newPedido = { ...pedido }; 
          newPedido.status = "cancelado";
          console.log(newPedido)

          await dispatch(updatePedido(newPedido));
          navigate(`/gerente/pedidos`);
          window.location.reload()
        }
    };

    const handleRevoke = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Revogar cancelamento? Isso fará a cobrança novamente.")) {

          let newPedido = { ...pedido }; 
          newPedido.status = "concluido";
          console.log(newPedido)

          await dispatch(updatePedido(newPedido));
          navigate(`/gerente/pedidos`);
          window.location.reload()
        }
    };

    return (
        <>
            <Link to={redirect}>
                <button className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-primaryBlue text-white w-full rounded-full">Ver todos os pedidos</button>
            </Link>

            {(!isCancelado && isGerente==="true") ? (
                <button onClick={handleCancel} className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-red-500 text-white w-full rounded-full">Cancelar pedido</button>
            ) : null}

            {(isCancelado && isGerente==="true") ? (
                <button onClick={handleRevoke} className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-red-500 text-white w-full rounded-full">Revogar cancelamento</button>
            ) : null}
        </>
    );
}

export default BotaoPedidos;
