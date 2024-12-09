import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlanos, planoSelectors } from "../../redux/planoSlice";
import { useState, useEffect } from "react";
import BotaoAzul from "../BotaoAzul";
import { selectUserById, updateUser, userSelectors } from "../../redux/usuarioSlice";

function InfoPlanoAssinar() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const plano = useSelector(state => planoSelectors.selectById(state, id));
    const planoStatus = useSelector((state) => state.planos.status);
    
    // Pega apenas o usuário de id 1 para fins de teste
    const user = useSelector(state => userSelectors.selectById(state, 1));

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

    function handleSubmit(e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Cria uma nova cópia do usuário com as modificações
        const updatedUser = {
            ...user,
            plano: nome,
        };

        // Dispara a ação de atualização do usuário
        dispatch(updateUser(updatedUser))
            .then(() => {
                // Ação concluída, redireciona para outra página ou força atualização do estado
                navigate('/cliente/planos');
            })
            .catch((error) => {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro ao atualizar usuário. Por favor, tente novamente.'); // Exibe mensagem de erro ao usuário
            });
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

    return (
        <div className="bg-white shadow-md rounded-[20px] border-2 p-4 mb-6">
            <form onSubmit={handleSubmit}>
                <h1 className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4">{nome}</h1>
                <h1 className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4">{`${preco !== "" ? "R$ " + preco : ""}`}</h1>
                <h1 className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4">{duracao}</h1>
                <h1 className="border border-accentBlue p-2 rounded-[20px] w-full mb-4 pl-4">{desconto}</h1>
                
                {beneficios.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <h1 className="border border-accentBlue p-2 w-fit pl-4">{item}</h1>
                    </div>
                ))}

                <BotaoAzul onClick={handleSubmit} type={"submit"} text={"Confirmar Assinatura"}></BotaoAzul>
            </form>
        </div>
    );
}

export default InfoPlanoAssinar;
