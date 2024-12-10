import {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { carrinhoSelectors, fetchCarrinho } from "../redux/carrinhoSlice";

export default function SideBarMenu(props){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false);

    const sidebarRef = useRef(null);

    const carrinho = useSelector(carrinhoSelectors.selectAll);
    const carrinhoStatus = useSelector(state => state.carrinho.status);
  
    
    useEffect(()=>{
      if(carrinhoStatus === "idle"){
        dispatch(fetchCarrinho())
      }
    }, [dispatch,carrinhoStatus]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

    useEffect(() => {
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);


    const handleLogout = ()=>{
      localStorage.removeItem("id");
      localStorage.removeItem("gerente")
      navigate("/");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }

    return(
        <>
        <div>
          <a onClick={toggleSidebar}>
            <img
              className={`${isOpen ? "invisible" : "w-10 h-10"} cursor-pointer`}
              src="/images/menu.png"
              alt="Menu de Navegação"
            />
          </a> 
        </div>

        <div className={`z-50 absolute top-0 ${isOpen? "w-full h-full":"invisible"} flex justify-end bg-opacity-50`}>
          <div
            ref={sidebarRef}
            className={`h-full ${isOpen ? "translate-x-0" : "translate-x-full"} bg-secondaryBlue flex justify-center text-white fixed shadow-black shadow-2xl transition-transform duration-300 ease-in-out`}
          >
            <div className="w-full min-w-[50px]">
              <div className="p-12 pt-10 text-center space-y-7 text-xl">
                <h1 className="text-3xl font-bold">MENU</h1>

                {
                  props.usuario? 
                    (props.usuario.isGerente ? 
                      <>
                      <span className='text-md text-black font-bold'>
                        Portal do Gerente
                      </span>

                        <hr />
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/criar-produto"> 📓 Criar Produto </Link> </ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/criar-plano"> 🌱 Criar Plano </Link> </ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/planos"> 💸 Planos Mensais </Link> </ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/pedidos"> 📦 Pedidos </Link></ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/solicitacoes"> ♻ Reciclagem</Link> </ul>
                        <hr />

                        <ul onClick={handleLogout} className="text-white font-bold cursor-pointer hover:text-red-700">
                          ❌ Logout 
                        </ul>

                      </> 
                      
                      :
                      
                      <>
                        <hr />
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/dados-cliente"> 👤 Meu Perfil </Link></ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/carrinho"> 🛒 Carrinho  <span>({carrinho.length})</span></Link> </ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/cliente/planos"> 💸 Planos Mensais </Link> </ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/cliente/pedidos"> 📦 Pedidos </Link></ul>
                            <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/cliente/solicitacoes"> ♻ Reciclagem</Link> </ul>
                        <hr />

                        <ul onClick={handleLogout} className="text-white font-bold cursor-pointer hover:text-red-700">
                          ❌ Logout 
                        </ul>

                      </>
                    )

                  :
                  <>
                    <hr />
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login"> 🛒 Carrinho </Link> </ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login"> 💸 Planos Mensais </Link> </ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login"> 📦 Pedidos </Link></ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login"> ♻ Reciclagem</Link> </ul>
                        
                    <hr/>

                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login"> 👤 Login </Link></ul>
                  </>
                }

              </div>
            </div>
          </div>
        </div>
        </>
    )
}
