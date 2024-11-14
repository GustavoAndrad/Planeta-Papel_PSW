function ItemPedido({nome, qt, total}) {
    return(
        <div class="w-full min-w-[200px] h-full flex justify-between px-6 items-center mt-5">
            <img src="/images/clipboard.png" class="size-20" alt=""/>
            <div>
                <h1 class="text-2xl font-bold text-accentBlue">{nome}</h1>
                <h2 class="font-bold text-sm">Quantidade: {qt}</h2>
                <h2 class="font-bold text-sm">R$ {total}</h2>
            </div>
        </div>
    );
}

export default ItemPedido;