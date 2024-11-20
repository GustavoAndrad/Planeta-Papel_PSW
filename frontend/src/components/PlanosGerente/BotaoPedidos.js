import { Link } from "react-router-dom";

function Botao({text}){
    return(
        <Link to="/gerente/criar-plano">
            <button className="w-full p-3 font-medium bg-primaryBlue text-white text-2xl rounded-full">{text}</button>
        </Link>
    )
}

export default Botao;