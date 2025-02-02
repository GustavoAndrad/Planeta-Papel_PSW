import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSolicitacao } from '../../redux/solicitacoesSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import BotaoAzul from "../BotaoAzul";
import BotaoVermelho from "../BotaoVermelho";


export default function BoxResultado({ solicitacaoId }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState(null);

    // Função para aprovar a solicitação
    function handleAprovar() {
        const dataLimite = document.getElementById('data-coleta').value;
        if (!dataLimite) {
            toast.error("Por favor, informe a data limite.");
            return;
        }
        const dataLimiteFormatada = new Date(dataLimite + "T00:00:00").toLocaleDateString('pt-BR');
        console.log(dataLimiteFormatada)
        const analise = {
            data: new Date().toLocaleDateString(),
            status: true,
            dataLimite: dataLimiteFormatada,
        };

        // Atualiza a solicitação no Redux com o novo atributo 'analise'
        dispatch(updateSolicitacao({ id: solicitacaoId, analise }));
        navigate('/gerente/solicitacoes')
        window.location.reload()
    }

    // Função para reprovar a solicitação
    function handleReprovar() {
        const motivo = document.getElementById('motivo').value;
        if (!motivo) {
            toast.error("Por favor, informe o motivo da negação.");
            return;
        }
        const analise = {
            data: new Date().toLocaleDateString(),
            status: false,
            motivoNegacao: motivo,
        };

        // Atualiza a solicitação no Redux com o novo atributo 'analise'
        dispatch(updateSolicitacao({ id: solicitacaoId, analise }));
        navigate('/gerente/solicitacoes')
        window.location.reload()
    }

    return (<>
        <div className="w-2/3 mx-auto min-w-72 py-5 mb-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue">
            <h1 className="text-xl font-semibold text-center">Qual o Resultado?</h1>
            <div className="w-3/4">
                <BotaoAzul onClick={()=>setStatus(true)} type={"button"} text={"Aprovar"} />
                <BotaoVermelho onClick={()=>setStatus(false)} type={"button"} text={"Reprovar"} />
            </div>
        </div>
        {/* Caso a solicitação tenha sido aprovada */}
        {status === true && (
            <div className="w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue">
                <h1 className="text-xl font-semibold text-center">Informar data limite</h1>
                <input
                    type="date"
                    id="data-coleta"
                    className="mt-3 w-30 text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <p className="mt-3 text-sm font-semibold text-center">
                    O horário padrão é SEMPRE de 10:00 às 18:00
                </p>
                <div className="w-3/4">
                    <BotaoAzul onClick={handleAprovar} type={"button"} text={"Confirmar"} />
                </div>
            </div>
        )}

        {/* Caso a solicitação tenha sido reprovada */}
        {status === false && (
            <div className="w-2/3 mx-auto min-w-72 py-5 flex flex-col items-center bg-white rounded-3xl border-2 border-accentBlue">
                <h1 className="text-xl font-semibold text-center">Informar motivo da <span className="text-cancelRed">negação</span></h1>
                <textarea
                    id="motivo"
                    name="motivo"
                    rows="4"
                    placeholder="Motivo da negação"
                    className="mt-3 w-5/6 rounded-xl"
                    required
                ></textarea>
                <div className="w-3/4">
                    <BotaoVermelho onClick={handleReprovar} type={"button"} text={"Confirmar"} />
                </div>
            </div>
        )}
    </>);
}