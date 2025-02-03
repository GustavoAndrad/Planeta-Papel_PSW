import { useCallback } from "react";

export default function Caixa({ items, setItems, outros, setOutros, isCheck, toggleCheck }){
    

    const handleItemsQtdChange = useCallback((value, index) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = { ...updatedItems[index], qtd: value };
            return updatedItems;
        });
    }, [setItems]);

    const handleOutroNomeChange = useCallback((value, index) => {
        setOutros((prevOutros) => {
            const updatedOutros = [...prevOutros];
            updatedOutros[index] = { ...updatedOutros[index], nome: value };
            return updatedOutros;
        });
    }, [setOutros]);

    const handleOutroQtdChange = useCallback((value, index) => {
        setOutros((prevOutros) => {
            const updatedOutros = [...prevOutros];
            updatedOutros[index] = { ...updatedOutros[index], qtd: value };
            return updatedOutros;
        });
    }, [setOutros]);

    function removeOutro(index){
        if(outros.length===1){
            setOutros([{ nome: "", qtd: "" }])
        }else
            setOutros(
                outros.filter((_,i)=>i!==index)
            )
    }
    function addOutro(){
        const ultimoItem = outros[outros.length - 1];
        if(ultimoItem.nome!=="")
            setOutros([...outros,{nome:"",qtd:""}]);
    }
    return(
        <>
            <div className="w-full min-w-[300px] mt-5 py-5 flex flex-col bg-white rounded-3xl border-2 border-accentBlue">
                <div className="w-full min-w-[200px] h-full flex justify-between px-6 items-center border-b-red-400 border-b-2">
                    <h1 className="text-xl font-bold text-secondaryBlue">O que vai reciclar ?</h1>
                </div>
                <div className="w-full min-w-[200px] h-full flex justify-start px-6">
                    <div className="mt-3">
                        {items.map((item, index)=>(
                            <div key={index} className="content-center">
                                <input id={index} name={item.nome} type="checkbox"  value={item.nome} onChange={()=>toggleCheck(index)}/>
                                <label htmlFor={item.nome} className="font-semibold pl-2 ">{item.nome}</label>
                                
                                <div className={`${(isCheck[index])? "px-6 py-1": "invisible h-0"}`}>
                                    <p className="font-semibold text-secondaryBlue">Quanto vai reciclar ?</p>
                                    <input
                                        type="text"
                                        value={item.qtd}
                                        onChange={(e)=>handleItemsQtdChange(e.target.value, index)}
                                        placeholder="Qtd"
                                        className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                                    />
                                </div>
                            </div>
                        ))}
                        <h2 className="text-md font-bold text-black">Outros:</h2>
                        {outros?.map((item,index)=>(
                        <div key={index} className="content-center">
                            <input
                                type="text"
                                value={item.nome}
                                onChange={(e)=>handleOutroNomeChange(e.target.value, index)}
                                placeholder="O que?"
                                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                            />
                            <input
                                type="text"
                                value={item.qtd}
                                onChange={(e)=>handleOutroQtdChange(e.target.value, index)}
                                placeholder="Qtd"
                                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                            />
                            {(outros[0].nome || outros.length >1) ?
                                <button
                                    type="button"
                                    onClick={()=>removeOutro(index)}
                                    className={`${item===""?"invisible":"mb-3 py-1.5 px-2.5 text-sm text-white bg-cancelRed hover:bg-red-700 rounded-full"}`}
                                    >
                                    Excluir
                                </button>
                            :null}
                        </div>
                        ))}
                        {(outros[0].nome || outros.length >1) ?
                            <button
                                type="button"
                                onClick={addOutro}
                                className="py-0.5 px-3 block text-lg text-white bg-primaryBlue hover:bg-secondaryBlue rounded-full"
                            >
                                +
                            </button>
                        :null}
                    </div>
                </div>
            </div>
        </>
    );
}