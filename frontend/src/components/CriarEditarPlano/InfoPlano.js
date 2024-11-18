import { Link } from "react-router-dom"

function InfoPlano({plano, setPlano, type}){
    function handleNomeChange(e){
        setPlano({
            ...plano,
            nome: e
        })
    }
    function handleCustoChange(e){
        if(!isNaN(e)){
            setPlano({
                ...plano,
                custo: e
            })
        }
    }
    function handleDuracaoChange(e){
        setPlano({
            ...plano,
            duracao: e
        })
    }
    function handleBeneficiosChange(novo, index){
        setPlano({
            ...plano,
            beneficios: plano.beneficios.map((b,i)=>
                i === index ? novo : b
            )
        })
    }
    function removeBeneficio(index){
        if(plano.beneficios.length===1){
            setPlano({
                ...plano,
                beneficios: [""]
            })
        }else
            setPlano({
                ...plano,
                beneficios: plano.beneficios.filter((_,i)=>i!==index)
            })
    }
    function addBeneficio(){
        const ultimoItem = plano.beneficios[plano.beneficios.length - 1];
        if(ultimoItem!=="")
            setPlano({
                ...plano,
                beneficios: [...plano.beneficios, ""]
            })
    }

    return(
        <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6" >
        <form>
            <input
                type="text"
                value={plano.nome}
                onChange={(e)=>handleNomeChange(e.target.value)}
                placeholder="Nome do Plano"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
            />
            <input
                type="text"
                value={`${plano.custo!==""?"R$ " + plano.custo:""}`}
                onChange={(e)=>handleCustoChange(e.target.value.replace("R$", "").trim())}
                placeholder="Preço Mensal"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
            />
            <input
                type="text"
                value={plano.duracao}
                onChange={(e)=>handleDuracaoChange(e.target.value)}
                placeholder="Duração"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
            />
            
            {plano.beneficios.map((item, index) => {
                return(
                <div className="flex justify-between items-center mb-4">
                    <input
                    type="text"
                    value={item}
                    onChange={(e)=>handleBeneficiosChange(e.target.value, index)}
                    placeholder="Benefício"
                    className="border border-accentBlue p-2 rounded-[20px] w-fit pl-4"
                    />
                    <button
                    type="button"
                    onClick={()=>removeBeneficio(index)}
                    className={`${item===""?"invisible":"py-1.5 px-2.5 text-sm text-white bg-cancelRed hover:bg-red-700 rounded-full"}`}
                    >
                    Excluir
                    </button>
                </div>
                )
            })}

            <button
                type="button"
                onClick={addBeneficio}
                className="py-0.5 px-3 block text-lg text-white bg-primaryBlue hover:bg-secondaryBlue rounded-full"
            >
                +
            </button>
            
            <div className={`${type===1?"":"invisible h-0"}`}>
                <Link to="/gerente/planos">
                    <button
                    className="bg-primaryBlue hover:bg-secondaryBlue text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
                    >
                    Confirmar
                    </button>
                </Link>
            </div>

            <div className={`${type===2?"":"invisible h-0"}`}>
                <Link to="/gerente/planos">
                    <button
                    className="bg-primaryBlue hover:bg-secondaryBlue text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
                    >
                    Salvar alterações
                    </button>
                    <button
                    className="bg-cancelRed hover:bg-red-700 text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
                    >
                    Excluir plano
                    </button>
                </Link>
            </div>
        </form>
      </div>
    )
}

export default InfoPlano;