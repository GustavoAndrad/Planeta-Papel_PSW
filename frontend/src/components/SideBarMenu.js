import {useState, useEffect, useRef} from 'react';

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

        <div class={`z-50 absolute top-0 ${isOpen? "w-full h-full":"invisible"} flex justify-end bg-opacity-50`}>
            <div ref={sidebarRef} class="h-full md:w-desktop sm:w-mobile bg-secondaryBlue flex justify-center text-white fixed shadow-black shadow-2xl">
                
                <div class="w-full min-w-[50px]">

                    <div class="p-12 pt-10 text-center space-y-7 text-xl">
                        <h1 class="text-3xl font-bold">MENU</h1>
                
                        <hr/>

                        <ul class="cursor-pointer hover:text-primaryBlue"><a href="/login_cliente"> 👤 Meu Perfil </a></ul>
                        <ul class="cursor-pointer hover:text-primaryBlue"><a href="/carrinho"> 🛒 Carrinho </a> </ul>
                        <ul class="cursor-pointer hover:text-primaryBlue"><a href="/assinar_plano"> 💸 Planos Mensais </a> </ul>
                        <ul class="cursor-pointer hover:text-primaryBlue"><a href="/pedidos_cliente"> 📦 Pedidos </a></ul>
                        <ul class="cursor-pointer hover:text-primaryBlue"><a href="/solic_reciclagem"> ♻ Reciclagem</a> </ul>
                        
                        <hr/>

                        <ul class=" text-white font-bold cursor-pointer hover:text-red-700"><a href="/login_cliente"> ❌ Logout </a></ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}