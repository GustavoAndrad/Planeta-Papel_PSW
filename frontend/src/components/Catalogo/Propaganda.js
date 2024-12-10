import { Link } from "react-router-dom";

function Propaganda(props) {

    const isGerente = localStorage.getItem("gerente")==='true'? true : false;
    const isLogged = localStorage.getItem("id");
    const redirect = isLogged? (isGerente? "/gerente/planos" : "/cliente/planos") : "/login";

    return (
      <>
        <div className="mt-[3rem] mb-[3rem] w-full h-auto flex justify-center items-center"> 
            <Link className="cursor-pointer bg-primaryBlue py-[0%] sm:py-[2%] min-w-[300px] w-2/3 h-full rounded-3xl sm:flex sm:justify-center sm:items-center]" to={redirect} replace>

                <div className=" w-full sm:w-1/2 min-h-[100px] border-whit border-b-4 sm:border-b-0 sm:border-r-4 flex items-center justify-center text-3xl text-white font-bold text-center">
                    PLANO {props.planoName.toString().toUpperCase()}
                </div>
                
                <div className="w-full sm:w-1/2 flex min-h-[100px] items-center justify-center text-center">
                    <div>
                        <span className="text-white font-bold lg:text-xl text-md"> Ganhe {parseInt(props.desconto)}% de desconto </span>
                        <br/> 
                        <span className="text-black lg:text-md text-sm font-bold hover:underline">Clique e saiba mais!</span>
                    </div>
                
                </div>

            </Link>
        </div>
      </>
    );
  }
  
  export default Propaganda;
  