import { Link } from "react-router-dom";

function CardPlano({id, name, preco, duracao, desconto, beneficios, isOpen, onClick}){
    if(isOpen){
        return(
        <div onClick={()=>onClick(id)} className="cursor-pointer w-full pb-10 min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-20 flex justify-between px-6 items-center border-b-red-400 border-b-2">
                <h1 className="text-xl font-bold text-primaryBlue">Plano {name}</h1>
                <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>

            <div className="w-full h-70 mt-10 flex justify-center items-center">
                <div className="w-[80%] h-full border-[#0000009d] border-2">
                    <div className="h-1/6 w-full flex justify-start items-center p-4 gap-4 border-b-red-400 border-b-2 min-w-[200px]">
                        <h1 className="text-xl font-medium text-">Preço Mensal: </h1>
                        <h1 className="text-xl font-semibold text-secondaryBlue">R$ {parseFloat(preco).toFixed(2)}</h1>
                    </div>

                    <div className="h-1/6 w-full border-b-red-400 border-b-2 flex justify-start items-center p-4 gap-4 min-w-[200px]">
                        <h1 className="text-xl font-medium text-">Duração: </h1>
                        <h1 className="text-xl font-semibold text-secondaryBlue">{duracao}</h1>
                    </div>

                    <div className="h-1/6 w-full border-b-red-400 border-b-2 flex justify-start items-center p-4 gap-4 min-w-[200px]">
                        <h1 className="text-xl font-medium text-">Desconto: </h1>
                        <h1 className="text-xl font-semibold text-secondaryBlue">{desconto}</h1>
                    </div>

                    <div className="h-1/2 w-full justify-start items-center p-4 gap-4 min-w-[200px]">
                        <h1 className="text-xl font-medium text-">Benefícios Mensais: </h1>
                        <h1 className="text-xl font-semibold text-secondaryBlue space-y-2">
                            <ul>
                                {beneficios.map((value, index) => {
                                    return (
                                        <li key={index}>🌟 {value}</li>
                                    )
                                })}
                            </ul>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="w-full h-70 mt-10 flex justify-center items-center">
                <Link to={`/cliente/plano/${id}`}>   
                    <button type="button" className="min-w-[250px] hover:bg-secondaryBlue w-3/4 bg-primaryBlue text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Assinar plano</button>
                </Link>
            </div>
        </div>
        )
    }
    return(
    <>
        <div onClick={()=>onClick(id)} className="w-full h-[100px] min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center">
                <h1 className="text-xl font-bold text-primaryBlue">Plano {name}</h1>
                <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>
        </div>    
    </>
    )
}

export default CardPlano