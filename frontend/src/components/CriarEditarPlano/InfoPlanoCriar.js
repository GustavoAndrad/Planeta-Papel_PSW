import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos, createPlano } from "../../redux/planoSlice"
import { useState, useEffect } from "react";
import BotaoAzul from "../BotaoAzul";

function InfoPlanoCriar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {planos, status:planoStatus} = useSelector(state=> state.planos);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [duracao, setDuracao] = useState("");
    const [desconto, setDesconto] = useState("");
    const [beneficios, setBeneficios] = useState([""]);

    // Consumindo informações
    useEffect(() => {
        if (planoStatus === "idle") {
            console.log(111)
            dispatch(fetchPlanos());
        }
    }, [dispatch, planoStatus]);

    const nextId = planos.length > 0 ? planos[planos.length-1].id + 1 : 1

    function handlePrecoChange(e){
        if(!isNaN(e)){
            setPreco(e);
        }
    };
    function handleDuracaoChange(e){
        e=parseInt(e);
        if(!isNaN(e)){
            setDuracao(e);
        }
    };
    function handleDescontoChange(e){
        e=parseInt(e);
        if(!isNaN(e)){
            setDesconto(e);
        }
    };
    function handleBeneficiosChange(novo, index){
        setBeneficios(
            beneficios.map((b, i)=>
                i === index ? novo : b
            )
        )
    };
    function removeBeneficio(index){
        if(beneficios.length===1){
            setBeneficios([""])
        }else
            setBeneficios(
                beneficios.filter((_,i)=>i!==index)
            )
    }
    function addBeneficio(){
        const ultimoItem = beneficios[beneficios.length - 1];
        if(ultimoItem!=="")
            setBeneficios([...beneficios,""])
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const ultimoItem = beneficios[beneficios.length - 1];

        const newPlano = {
            id: parseInt(nextId),
            nome,
            preco,
            duracao,
            desconto,
            beneficios: ultimoItem!==""? beneficios: beneficios.slice(0, beneficios.length - 1),
        };
        dispatch(createPlano(newPlano));
    
        navigate('/gerente/planos');
    };
    
    // Lidar com estados de carregamento ou erro
    if (planoStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (planoStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do plano.</div>;
    }
    return(
        <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6" >
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                placeholder="Nome do Plano"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                required
            />
            <input
                type="text"
                value={`${preco!==""?"R$ " + preco:""}`}
                onChange={(e)=>handlePrecoChange(e.target.value.replace("R$", "").trim())}
                placeholder="Preço Mensal"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                required
            />
            <input
                type="text"
                value={duracao}
                onChange={(e)=>handleDuracaoChange(e.target.value)}
                placeholder="Duração"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                required
            />
            <input
                type="text"
                value={desconto}
                onChange={(e)=>handleDescontoChange(e.target.value)}
                placeholder="Desconto"
                className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4"
                required
            />
            
            {beneficios.map((item, index) => {
                return(
                <div key={index} className="flex justify-between items-center mb-4">
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
            <BotaoAzul type={"submit"} text={"Confirmar"}></BotaoAzul>
{/*
            <button
            type = 'submit'
            className="bg-primaryBlue hover:bg-secondaryBlue text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
            >
            Confirmar
            </button>
*/}
        </form>
      </div>
    )
}

export default InfoPlanoCriar;