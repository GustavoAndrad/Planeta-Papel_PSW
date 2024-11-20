function CardPlano({name, isOpen, preco, duracao, beneficios}){
    if(isOpen){
        return(
            <div className="w-full h-[550px] min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
        <div className="w-full min-w-[200px] h-20 flex justify-between px-6 items-center border-b-red-400 border-b-2">
            <h1 className="text-xl font-bold text-primaryBlue">Plano {name}</h1>
            <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
        </div>

        <div className="w-full h-70 mt-10 flex justify-center items-center">
            <div className="w-[80%] h-full border-[#0000009d] border-2">
                <div className="h-1/6 w-full flex justify-start items-center p-4 gap-4 border-b-red-400 border-b-2 min-w-[200px]">
                    <h1 className="text-xl font-semibold text-">Preço Mensal: </h1>
                    <h1 className="text-xl font-semibold text-secondaryBlue">R$ {preco}</h1>
                </div>

                <div className="h-1/6 w-full border-b-red-400 border-b-2 flex justify-start items-center p-4 gap-4 min-w-[200px]">
                    <h1 className="text-xl font-semibold text-">Duração: </h1>
                    <h1 className="text-xl font-semibold text-secondaryBlue">{duracao}</h1>
                </div>

                <div className="h-1/2 w-full justify-start items-center p-4 gap-4 min-w-[200px]">
                    <h1 className="text-xl font-semibold text-">Benefícios Mensais: </h1>
                    <h1 className="text-xl font-semibold text-secondaryBlue space-y-2">
                        {beneficios.map((value, index) => {
                            return (
                                <ul>🌟 {value}</ul>
                            )
                        })}
                    </h1>
                </div>
            </div>
        </div>

        <div className="w-full h-70 mt-10 flex justify-center items-center">
            <a href="./editar_plano.html">   
                <button type="submit" className="min-w-[200px] hover:bg-secondaryBlue w-3/4 bg-primaryBlue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Editar plano</button>
            </a>
        </div>
    </div>
        )
    }
    return(
    <>
        <div className="w-full h-[100px] min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center">
                <h1 className="text-xl font-bold text-primaryBlue">Plano {name}</h1>
                <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>
        </div>    
    </>
    )
}

export default CardPlano