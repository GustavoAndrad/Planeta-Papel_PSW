import BotaoAzul from "../BotaoAzul";
import BotaoVermelho from "../BotaoVermelho";


export default function BoxResultado({status,setStatus}){

    function handleStatus(x){
        setStatus(x);
    }
    if(status===null)
        return(<>
            <div className={"w-2/3 mx-auto min-w-72 py-5 mb-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue"}>
                <h1 className="text-xl font-semibold text-center">Qual o Resultado?</h1>
                <div className="w-3/4">
                    <BotaoAzul onClick={()=>(handleStatus(true))} type={"button"} text={"Aprovar"}></BotaoAzul>
                    <BotaoVermelho onClick={()=>(handleStatus(false))} type={"button"} text={"Reprovar"}></BotaoVermelho>
                </div>
            </div>
        </>)
    else if(status===true)
        return(<>
            <div className={"w-2/3 mx-auto min-w-72 py-5 mb-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue"}>
                <h1 className="text-xl font-semibold text-center">Qual o Resultado?</h1>
                <div className="w-3/4">
                    <BotaoAzul onClick={()=>(handleStatus(true))} type={"button"} text={"Aprovar"}></BotaoAzul>
                    <BotaoVermelho onClick={()=>(handleStatus(false))} type={"button"} text={"Reprovar"}></BotaoVermelho>
                </div>
            </div>

            <div className={"w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue"}>
                <h1 className="text-xl font-semibold text-center">Informar data limite</h1>
                <input type="date" id="data-coleta" className="mt-3 overflow-hidden whitespace-nowrap text-ellipsis block p-2.5 w-30 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
                <p className="mt-3 text-sm font-semibold text-center">O horário padrão é SEMPRE de<br/>10:00 às 18:00</p>
                <div className="w-3/4">
                    <BotaoAzul type={"submit"} text={"Confirmar"}></BotaoAzul>
                </div>
            </div>
        </>)
    else
        return(<>
            <div className={"w-2/3 mx-auto min-w-72 py-5 mb-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue"}>
                <h1 className="text-xl font-semibold text-center">Qual o Resultado?</h1>
                <div className="w-3/4">
                    <BotaoAzul onClick={()=>(handleStatus(true))} type={"button"} text={"Aprovar"}></BotaoAzul>
                    <BotaoVermelho onClick={()=>(handleStatus(false))} type={"button"} text={"Reprovar"}></BotaoVermelho>
                </div>
            </div>

            <div className={"w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue"}>
                <h1 className="text-xl font-semibold text-center">Informar motivo da <span className="text-cancelRed">negação</span></h1>
                <textarea id="motivo" name="motivo" rows="4" placeholder="Motivo da negação" className="mt-3 w-5/6  rounded-xl" required></textarea>
                <div className="w-3/4">
                    <BotaoVermelho type={"submit"} text={"Confirmar"}></BotaoVermelho>
                </div>
            </div>
        </>);
}