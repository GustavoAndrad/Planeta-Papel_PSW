

export default function BoxResultado({status,setStatus}){

    function handleStatus(x){
        setStatus(x);
    }

    return(<>
        <div className={`${status===null? "w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue":"invisible h-0"}  `}>
            <h1 className="text-xl font-semibold text-center">Qual o Resultado?</h1>
            <button onClick={()=>(handleStatus(true))} type="submit" className="mt-3 min-w-[200px] hover:bg-secondaryBlue w-3/4 bg-primaryBlue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Aprovar</button>
            <button onClick={()=>(handleStatus(false))} type="submit" className="mt-3 min-w-[200px] hover:bg-red-700 w-3/4 bg-cancelRed text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Reprovar</button>
        </div>

        <div className={`${status===true? "w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue":"invisible h-0"}  `}>
            <h1 className="text-xl font-semibold text-center">Informar data limite</h1>
            <input type="date" id="data-coleta" className="mt-3 overflow-hidden whitespace-nowrap text-ellipsis block p-2.5 w-30 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" required />
            <a className="mt-3 text-sm font-semibold text-center">O horário padrão é SEMPRE de<br/>10:00 às 18:00</a>
            <button type="submit" className="mt-3 min-w-[200px] hover:bg-secondaryBlue w-3/4 bg-primaryBlue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Confirmar</button>
        </div>

        <div className={`${status===false? "w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue":"invisible h-0"}  `}>
            <h1 className="text-xl font-semibold text-center">Informar motivo da <span className="text-cancelRed">negação</span></h1>
            <textarea id="motivo" name="motivo" rows="4" placeholder="Motivo da negação" className="mt-3 w-5/6  rounded-xl" required></textarea>
            <button type="submit" className="mt-3 min-w-[200px] hover:bg-red-700 w-3/4 bg-cancelRed text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Confirmar</button>
        </div>
    </>);
}