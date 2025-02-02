
function CardCliente({isOpen, onClick, id, nome, email, telefone, cep}){
    if(isOpen){
        return(
        <div className=" w-full pb-10 min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-[100px] flex justify-between px-6 items-center border-b-red-400 border-b-2">
                <h1 className="text-xl font-bold text-primaryBlue">Identificador: {id} <br/> Cliente: {nome}</h1>
                <img onClick={()=>onClick(id)} className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>

            <div className="w-full h-70 mt-10 pl-8 items-center">

                <h1 className="text-xl font-bold text-primaryBlue">📨 Email: {email} <br/><br/> 📱 Telefone: {telefone} <br/><br/> 🏠 CEP: {cep}</h1>
                <br/>
                <span className="text-red-600 font-bold text-[0.7em]">
                   🚨 Para consultas avançadas ou alterações, consulte os desenvolvedores em +11 12345-6789 
                </span>
            </div>
        </div>
        )
    }
    return(
    <>
        <div onClick={()=>onClick(id)} className="w-full h-[100px] min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-[100px] flex justify-between px-6 items-center">
            <h1 className="text-xl font-bold text-primaryBlue">Identificador: {id} <br/> Cliente: {nome}</h1>
            <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>
        </div>    
    </>
    )
}

export default CardCliente