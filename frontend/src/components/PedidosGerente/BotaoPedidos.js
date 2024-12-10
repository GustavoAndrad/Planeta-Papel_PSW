import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updatePedido } from "../../redux/pedidoSlice";

function BotaoPedidos({isCancelado, pedido}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isGerente, setIsGerente] = useState(() => localStorage.getItem("gerente"));
    const redirect = (isGerente==="true") ? "/gerente/pedidos":"/cliente/pedidos";

    const handleCancel = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Alterar Permanentemente?")) {

          let newPedido = { ...pedido }; 
          newPedido.isCancelado = true;

          await dispatch(updatePedido(newPedido));
          navigate(`/gerente/pedidos`);
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
        </>
    );
}

export default BotaoPedidos;
