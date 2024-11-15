import InfoPlano from "../components/EditarPlano/InfoPlano";
import TitleSection from "../components/PedidosGerente/TitleSection";

function EditarPlano(){

    const plano = {nome: "Origami", custo: "123", duracao: "3 meses", beneficios: ["15% de desconto", "Brindes exclusivos"]}

    return(
        <>
        <TitleSection sectionName={"Editar Plano de Assinatura"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlano nome={plano.nome} beneficios={plano.beneficios} custo={plano.custo} duracao={plano.duracao}></InfoPlano>
        </>
    )
}

export default EditarPlano;