import { Link } from "react-router-dom";

function CardSolic({id, cliente, isOpen, onClick}){
    if(isOpen){
        return(
        <div onClick={()=>onClick(id)} className="cursor-pointer w-full pb-10 min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-[100px] flex justify-between px-6 items-center border-b-red-400 border-b-2">
                <h1 className="text-xl font-bold text-primaryBlue">Solicitação: {id} </h1>
                <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>

            <div className="w-full h-70 mt-10 flex justify-center items-center">
                <Link to={`/gerente/analisar/${id}`}>   
                    <button type="button" className="min-w-[250px] hover:bg-secondaryBlue max-w-[300px] bg-primaryBlue text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Acompanhar Solicitação</button>
                </Link>
            </div>
        </div>
        )
    }
    return(
    <>
        <div onClick={()=>onClick(id)} className="w-full h-[100px] min-w-[300px] mt-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-[100px] flex justify-between px-6 items-center">
                <h1 className="text-xl font-bold text-primaryBlue">Solicitação: {id} </h1>
                <img className="size-7 cursor-pointer" src="/images/seta_baixo.png" alt=""/>
            </div>
        </div>    
    </>
    )
}

export default CardSolic