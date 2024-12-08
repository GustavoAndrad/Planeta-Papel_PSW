import InfoPlanoCriar from "../components/CriarEditarPlano/InfoPlanoCriar";
import { Link } from "react-router-dom";
import BotaoRetorno from "../components/BotaoRetorno";
import TitleSection from "../components/PedidosGerente/TitleSection";


export default function CriarPlano(){

    return(<>
        <Link to="/gerente/planos">
            <BotaoRetorno/>
        </Link>
        <TitleSection sectionName={"Criar Plano de Assinatura"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlanoCriar></InfoPlanoCriar>

    </>)
}