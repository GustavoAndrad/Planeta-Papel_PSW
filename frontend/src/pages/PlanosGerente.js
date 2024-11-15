import SectionName from "../components/PedidosGerente/TitleSection"
import Botao from "../components/PlanosGerente/BotaoPedidos"
import CardPlano from "../components/PlanosGerente/CardPlano"

function PlanosGerente(){

    const planos = [{nome: "Post-it", isOpen: false},
        {nome: "A4", isOpen: true, preco: 123, duracao: "3 meses", beneficios: ["15% de desconto", "brindes exclusivos"]},
        {nome: "Cartolina", isOpen: false}
    ]

    return(
        <>
            <SectionName sectionName={"Gerenciar Planos"} img={"/images/assinatura.png"}></SectionName>
            <Botao text={"Adicionar plano"}></Botao>
            {planos.map((item, index) => {
                return (
                    <CardPlano name={item.nome} beneficios={item.beneficios} isOpen={item.isOpen} duracao={item.duracao} preco={item.preco}></CardPlano>
                )
            })}
        </>
    )
}

export default PlanosGerente