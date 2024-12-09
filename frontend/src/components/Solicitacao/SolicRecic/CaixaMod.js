
export default function CaixaMod({ isCheckMod, toggleCheckMod }){
    

    return(
    <>
        <div className="w-full min-w-[300px] mt-5 py-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
            <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center border-b-red-400 border-b-2">
                <h1 className="text-xl font-bold text-secondaryBlue">Modalidade da Coleta</h1>
            </div>
            <div className="w-full min-w-[200px] h-full flex justify-start px-6">
                <div className="mt-3">
                    <div className="content-center">
                        <input type="checkbox" checked={isCheckMod === "endereco"} onClick={() => toggleCheckMod("endereco")}/>
                        <label className="font-semibold pl-2 ">Coletar no meu endereço</label>
                        <br/>
                        <input type="checkbox" checked={isCheckMod === "loja"} onClick={() => toggleCheckMod("loja")}/>
                        <label className="font-semibold pl-2 ">Vou levar à loja</label>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}