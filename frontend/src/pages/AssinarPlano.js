import { Link, useNavigate } from "react-router-dom";
import BotaoRetorno from "../components/BotaoRetorno";
import InfoPlanoAssinar from "../components/PlanosCliente/InfoPlanoAssinar"
import TitleSection from "../components/PedidosGerente/TitleSection";

function AssinarPlano(){

    return(
        <>
        <Link to="/cliente/planos">
            <BotaoRetorno/>
        </Link>
        <TitleSection sectionName={"Assinar Plano Mensal"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlanoAssinar></InfoPlanoAssinar>
        </>
    )
}

export default AssinarPlano;