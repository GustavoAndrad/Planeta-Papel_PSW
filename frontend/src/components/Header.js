import SidebarMenu from "./SideBarMenu";
import { Link } from "react-router-dom";

function Header() {
    
  return (
    <>
      <header className="pl-2 pr-6 w-full h-28 bg-secondaryBlue fixed top-0 z-10 flex items-center justify-between border-b-accentBlue border-b-8">
        <div>
          <Link to="/catalogo">
            <img
              className="w-20 h-20 cursor-pointer"
              src="/images/logo_pp.png"
              alt="Logo da Planeta Papel"
            />
          </Link>
        </div>

        <SidebarMenu/>
      </header>

    </>
  );
}

export default Header;

