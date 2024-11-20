function BotaoPedidos({isCancelar}){
    if(!isCancelar){
        return(
            <button className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-primaryBlue text-white w-full rounded-full">Ver todos os pedidos</button>
        )
    }else{
        return(
            <button className="text-xl my-10 p-3 font-semibold flex items-center justify-center mx-auto bg-red-500 text-white w-full rounded-full">Cancelar pedido</button>
        )
    }
}

export default BotaoPedidos;