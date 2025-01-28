import { useEffect, useState } from "react";
import SidebarMenu from "./SideBarMenu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, userSelectors } from "../redux/usuarioSlice";
import { selectUser } from "../redux/usuarioSlice";

function Header() {
  const dispatch = useDispatch();

  const usuario = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); 
    

  return (
    <>
      <header className="pl-2 pr-6 w-full h-28 bg-secondaryBlue fixed top-0 z-10 flex items-center justify-between border-b-accentBlue border-b-8">
        <div className="flex gap-4 font-bold text-md items-center text-white">
          <Link to="/catalogo">
            <img
              className="w-20 h-20 cursor-pointer"
              src="/images/logo_pp.png"
              alt="Logo da Planeta Papel"
            />
          </Link>

          {<>{usuario?<span>Como posso te ajudar, {usuario.nome}?</span>:<Link to="/login">É novo por aqui?</Link>}</>}
        </div>

        <SidebarMenu usuario={usuario}/>
      </header>

    </>
  );
}

export default Header;

