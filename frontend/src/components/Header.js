import { useSelector } from "react-redux";
import SidebarMenu from "./SideBarMenu";
import { Link } from "react-router-dom";
import { userSelectors } from "../redux/usuarioSlice";

function Header() {
  const userId = localStorage.getItem('id');
  const usuario = useSelector((state) => userSelectors.selectById(state, userId));

  const {nome} = usuario;
  return (
    <>

      <header className="pl-2 pr-6 w-full h-28 bg-secondaryBlue fixed top-0 z-10 flex items-center justify-between border-b-accentBlue border-b-8">
        <div className="flex gap-3 text-white items-center text-md font-bold">
          <Link to="/catalogo">
            <img
              className="w-20 h-20 cursor-pointer"
              src="/images/logo_pp.png"
              alt="Logo da Planeta Papel"
            />
          </Link>
          {userId?
            <>Como posso ajudar, {nome} ?</>
            :null
          }
        </div>

        <SidebarMenu/>
      </header>

    </>
  );
}

export default Header;

