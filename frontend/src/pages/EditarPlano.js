import { useState } from "react";
import InfoPlano from "../components/CriarEditarPlano/InfoPlano";
import TitleSection from "../components/PedidosGerente/TitleSection";

function EditarPlano(){

    const startPlano = {
        nome: "Origami", 
        custo: "123", 
        duracao: "3 meses", 
        beneficios: ["15% de desconto", "Brindes exclusivos"]
    }

    const [plano,setPlano] = useState(startPlano);

    return(
        <>
        <TitleSection sectionName={"Editar Plano de Assinatura"} img={"/images/assinatura.png"}></TitleSection>
        <InfoPlano plano={plano} setPlano={setPlano} type={2}></InfoPlano>
        </>
    )
}

export default EditarPlano;