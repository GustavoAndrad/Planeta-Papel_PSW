import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, fetchUsers, selectUser, userSelectors } from "../../redux/usuarioSlice";

function formatSectionName(name, num) {
    return name.padEnd(num, '.');
}

export default function Box({ info, type }) {
    const dispatch = useDispatch();
    const isGerente = localStorage.getItem("gerente") === "true";

    const clientData = useSelector(selectUser);
    const users = useSelector(userSelectors.selectAll);
    const clientStatus = useSelector((state) => state.users.status);
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!isGerente) {
            dispatch(fetchUsers());
        } else {
            dispatch(fetchAllUsers());
        }
    }, [dispatch, isGerente]);

    useEffect(() => {
        if (isGerente && users.length > 0) {
            setUser(users.find((u) => u.id === info.cliente) || null);
        }
    }, [users, info.cliente, isGerente]);

    
    if (clientStatus === "pending") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Carregando...</div>;
    }
    
    if (clientStatus === "failed") {
        return <div className="w-full h-full flex justify-center items-center text-2xl bold pt-10">Erro ao carregar informações.</div>;
    }

    if (type === 1) { // Gerente
        return (
            <>
                <h1 className="text-xl font-semibold">Resumo da Solicitação</h1>
                <div className="mt-3 mb-5 p-3 bg-white">
                    <p className="text-lg font-semibold border-b-red-400 border-b-2">
                        Cliente: <span className="text-lg font-semibold text-secondaryBlue">
                            {isGerente ? user?.nome : clientData?.nome} - {info.cliente}
                        </span>
                    </p>

                    <p className="text-lg font-semibold mt-2">Itens:</p>
                    <ul className="pl-5 list-disc text-lg text-secondaryBlue border-b-red-400 border-b-2">
                        {info.items?.map((item, index) => (
                            <li key={`item-${index}`} className="font-mono">{formatSectionName(item.nome, 20)}{item.qtd}</li>
                        ))}
                        {info.outros?.length > 0 && (
                            <>
                                <li className="font-mono">Outro:</li>
                                <ul className="list-disc pl-5">
                                    {info.outros.map((item, subIndex) => (
                                        <li key={`subitem-${subIndex}`} className="font-mono">{formatSectionName(item.nome, 18)}{item.qtd}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </ul>

                    <p className="text-lg font-semibold border-b-red-400 border-b-2 mt-2">
                        Modalidade: <span className="text-lg font-semibold text-secondaryBlue">{info.modalidade}</span>
                    </p>
                    <p className="text-lg font-semibold mt-2">
                        Solicitado em: <span className="text-lg font-semibold text-secondaryBlue">
                            {new Date(info.data).toLocaleDateString("pt-BR")}
                        </span>
                    </p>
                </div>
            </>
        );
    } else { // Cliente
        return (
            <>
                <h1 className="text-xl font-semibold">Resultado da Análise</h1>
                {info.analise === null ? (
                    <h1 className="text-2xl font-semibold text-cancelRed">A análise ainda não ocorreu</h1>
                ) : (
                    <div className="mt-3 p-3 bg-white">
                        <p className="text-lg font-semibold border-b-red-400 border-b-2">
                            Realizado em: <span className="text-lg font-semibold text-secondaryBlue">
                                {new Date(info.analise.data).toLocaleDateString("pt-BR")}
                            </span>
                        </p>
                        <p className="text-lg font-semibold border-b-red-400 border-b-2 mt-2">
                            Status: <span className={`text-lg font-semibold ${info.analise.status ? "text-primaryBlue" : "text-cancelRed"}`}>
                                {info.analise.status ? "APROVADO" : "NÃO APROVADO"}
                            </span>
                        </p>

                        {info.analise.status ? (
                            <>
                                <p className="text-lg font-semibold mt-2">
                                    Data limite para Coleta: <span className="text-lg font-semibold text-secondaryBlue">
                                        {info.analise.dataLimite}
                                    </span>
                                </p>
                                <p className="text-sm font-semibold">O horário padrão é SEMPRE de 10:00 às 18:00</p>
                            </>
                        ) : (
                            <div className="mt-4 p-4 border-2 border-cancelRed rounded-lg bg-red-50">
                                <div className="flex items-center mb-2">
                                    <span className="text-xl font-semibold text-cancelRed mr-2">⚠️</span>
                                    <h3 className="text-lg font-semibold text-cancelRed">Motivo da Negação:</h3>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {info.analise.motivoNegacao.split('\n').map((line, index) => (
                                        <span key={index}>
                                            {line}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </>
        );
    }
}
