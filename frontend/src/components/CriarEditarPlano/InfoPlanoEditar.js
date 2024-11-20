import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { updatePlano, removePlano} from "../../redux/planoSlice"
import { useState, useEffect } from "react";

function InfoPlanoEditar(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const plano = useSelector((state) =>
        state.planos.find((plano) => plano.id === parseInt(id))
    );

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [duracao, setDuracao] = useState("");
    const [beneficios, setBeneficios] = useState([""]);
    
    useEffect(() => {
        if (plano) {
          setNome(plano.nome);
          setPreco(plano.preco);
          setDuracao(plano.duracao);
          setBeneficios(plano.beneficios);
        }
      }, [plano]);

    function handlePrecoChange(e){
        if(!isNaN(e)){
            setPreco(e);
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

        const updatedPlano = {
          nome,
          preco,
          duracao,
          beneficios: ultimoItem!==""? beneficios: beneficios.slice(0, beneficios.length - 1),
        };
        
        dispatch(updatePlano({ id: plano.id, updatedPlano }));
    
        navigate('/gerente/planos');
    };
    function handleRemove(id){
        dispatch(removePlano(id));
        navigate('/gerente/planos');
    };
    
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
                onChange={(e)=>setDuracao(e.target.value)}
                placeholder="Duração"
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

            <button
                type = 'submit'
                className="bg-primaryBlue hover:bg-secondaryBlue text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
            >
                Salvar alterações
            </button>

            <button
                type = 'button' 
                onClick={()=>handleRemove(plano.id)}
                className="bg-cancelRed hover:bg-red-700 text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
            >
                Excluir plano
            </button>

        </form>
      </div>
    )
}

export default InfoPlanoEditar;