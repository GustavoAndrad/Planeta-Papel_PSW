function Pedido({data, valor, cancelled}){
    
    const img_src = cancelled === false ? "/images/ok_verde.png" : "/images/cancelar_vermelho.png";
    
    return (
        <div className="cursor-pointer w-full h-[100px] min-w-[300px] mt-5 flex flex-col justify-center pl-6 bg-white rounded-3xl border-2 border-accentBlue">
              <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center">
                  <div>
                      <h1 className="text-xl font-bold text-primaryBlue">{data}</h1>
                      <h2 className="font-bold text-sm">R${valor}</h2>
                  </div>
                  <img src={img_src} className="size-10" alt=""></img>
              </div>
        </div>
    )
}

export default Pedido