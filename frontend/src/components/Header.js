
function Header() {
  return (
    <>

      <header className="pl-2 pr-6 w-full h-28 bg-secondaryBlue fixed top-0 z-10 flex items-center justify-between border-b-accentBlue border-b-8">
        <div>
          <a href="./catálogo.html">
            <img
              className="w-20 h-20 cursor-pointer"
              src="/images/logo_pp.png"
              alt="Logo da Planeta Papel"
            />
          </a>
        </div>

        <div>
          <a href="./open_menu.html">
            <img
              className="w-10 h-10 cursor-pointer"
              src="/images/menu.png"
              alt="Menu de Navegação"
            />
          </a>
        </div>
      </header>

    </>
  );
}

export default Header;

