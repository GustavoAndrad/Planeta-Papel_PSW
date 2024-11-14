import "./style/index.css";
import "./style/generated.css";
import Footer from "./components/Footer";
import Header from "./components/Header"
import Catalogo from "./pages/Catalogo";
import Carrinho from "./pages/Carrinho";
import PedidosGerente from "./pages/PedidosGerente";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import PedidoCliente from "./pages/PedidoCliente";
import CancelarPedido from "./pages/CancelarPedido";

function App() {
  return (
    <>
      <Header />

      <main className="pt-36 pb-10 pl-6 pr-6 min-h-[100vh] h-auto max-w-full">
      
        <BrowserRouter>
          <Routes>
            {/* CONTEÚDO AQUI */}
            <Route path="/" element={<Catalogo />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/gerente/pedidos" element={<PedidosGerente/>} />
            <Route path="/cliente/pedido" element={<PedidoCliente/>} />
            <Route path="/gerente/pedido" element={<CancelarPedido/>} />
          </Routes>
        </BrowserRouter>
      
      </main>

      <Footer />
    </>
  );
}

export default App;

