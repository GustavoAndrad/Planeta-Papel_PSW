import {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';

export default function SideBarMenu(){
    const [isOpen, setIsOpen] = useState(false);

    const sidebarRef = useRef(null);

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

                <hr />

                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/login_cliente"> 👤 Meu Perfil </Link></ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/carrinho"> 🛒 Carrinho </Link> </ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/assinar_plano"> 💸 Planos Mensais </Link> </ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/pedidos_cliente"> 📦 Pedidos </Link></ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/solic_reciclagem"> ♻ Reciclagem</Link> </ul>
                        <ul className="cursor-pointer hover:text-primaryBlue"><Link to="/gerente/planos"> 💸 ADMIN PLANO </Link> </ul>
                        
                        <hr/>

                <hr />

                <ul className="text-white font-bold cursor-pointer hover:text-red-700">
                  <a href="/login_cliente"> ❌ Logout </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
