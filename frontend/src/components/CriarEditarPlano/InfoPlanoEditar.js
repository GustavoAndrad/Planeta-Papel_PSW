import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos, updatePlano, deletePlano, planoSelectors } from "../../redux/planoSlice"
import { useState, useEffect } from "react";
import BotaoVermelho from "../BotaoVermelho";
import BotaoAzul from "../BotaoAzul";
import planoValidationSchema from "../../YupSchema/planoSchema";
import { toast } from 'react-toastify';

function InfoPlanoEditar(){
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const plano = useSelector(state => planoSelectors.selectById(state, id));
    const planoStatus = useSelector((state) => state.planos.status);
    // Carregar os planos ao montar o componente, se necessário
    useEffect(() => {
        if (planoStatus === "idle") {
        dispatch(fetchPlanos()); // Disparando a action para buscar os planos
        }
    }, [planoStatus, dispatch]);

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState(0);
    const [duracao, setDuracao] = useState(0);
    const [desconto, setDesconto] = useState(0);
    const [beneficios, setBeneficios] = useState([""]);
    
    useEffect(() => {
        if (plano) {
          setNome(plano.nome);
          setPreco(plano.preco);
          setDuracao(plano.duracao);
          setDesconto(plano.desconto);
          setBeneficios(plano.beneficios);
        }
      }, [plano]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const ultimoItem = beneficios[beneficios.length - 1];

        const updatedPlano = {
            id,
            nome,
            preco: parseFloat(preco).toFixed(2),
            duracao,
            desconto,
            beneficios: ultimoItem!==""? beneficios: beneficios.slice(0, beneficios.length - 1),
        };

        try{
            await planoValidationSchema.validate(updatedPlano, { abortEarly: false });
          } catch(e){
            e.inner.forEach((err) => {
              toast.error(`${err.message}`);
            });
            return
          }

        dispatch(updatePlano(updatedPlano));
    
        navigate('/gerente/planos');
    };
    function handleRemove(id){
        dispatch(deletePlano(id));
        navigate('/gerente/planos');
    };
    
    // Lidar com estados de carregamento ou erro
    if (planoStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (planoStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações do plano.</div>;
    }

    if (!plano) {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Plano não encontrado.</div>;
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

            <BotaoAzul type={"submit"} text={"Salvar alterações"}></BotaoAzul>
{/*
            <button
                type = 'submit'
                className="bg-primaryBlue hover:bg-secondaryBlue text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
            >
                Salvar alterações
            </button>
*/}
            
            <BotaoVermelho type={"button"} onClick={()=>handleRemove(plano.id)} text={"Excluir plano"}></BotaoVermelho>
{/*
            <button
                type = 'button' 
                onClick={()=>handleRemove(plano.id)}
                className="bg-cancelRed hover:bg-red-700 text-white py-2 px-4 rounded-full w-full mt-4 font-bold text-lg"
            >
                Excluir plano
            </button>
*/}
        </form>
      </div>
    )
}

export default InfoPlanoEditar;