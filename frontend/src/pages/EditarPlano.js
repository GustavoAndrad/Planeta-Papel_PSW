import InfoPlanoEditar from "../components/CriarEditarPlano/InfoPlanoEditar";
import TitleSection from "../components/PedidosGerente/TitleSection";

function EditarPlano(){

    return(
        <>
        <TitleSection sectionName={"Editar Plano de Assinatura"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlanoEditar></InfoPlanoEditar>
        </>
    )
}

export default EditarPlano;