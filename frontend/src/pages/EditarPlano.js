import { Link } from "react-router-dom";
import BotaoRetorno from "../components/BotaoRetorno";
import InfoPlanoEditar from "../components/CriarEditarPlano/InfoPlanoEditar";
import TitleSection from "../components/PedidosGerente/TitleSection";

function EditarPlano(){

    return(
        <>
        <Link to="/gerente/planos">
            <BotaoRetorno/>
        </Link>
        <TitleSection sectionName={"Editar Plano de Assinatura"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlanoEditar></InfoPlanoEditar>
        </>
    )
}

export default EditarPlano;