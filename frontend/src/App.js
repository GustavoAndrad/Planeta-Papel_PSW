import "./style/index.css";
import "./style/generated.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Catalogo from "./pages/Catalogo";
import Carrinho from "./pages/Carrinho";
import PedidosGerente from "./pages/PedidosGerente";
import PlanosGerente from "./pages/PlanosGerente";
import PedidoCliente from "./pages/PedidoCliente";
import PedidosCliente from "./pages/PedidosCliente";
import CancelarPedido from "./pages/CancelarPedido";
import EditarPlano from "./pages/EditarPlano";
import SolicReciclagem from "./pages/SolicReciclagem";
import AcompSolic from "./pages/AcompSolic";
import AnalisarSolic from "./pages/AnalisarSolic";
import CriarPlano from "./pages/CriarPlano";
import Produto from "./pages/Produto";
import Pagamento from "./pages/Pagamento";
import CriarProduto from "./pages/CriarProduto";
import AlteraProduto from "./pages/AlterarProduto"
import CadastroCliente from "./pages/CadastroCliente";
import EditarExcluirCliente from "./pages/EditarExcluirCliente";
import Login from "./pages/Login";
import AssinarPlano from "./pages/AssinarPlano";
import PlanosCliente from "./pages/PlanosCliente";
import SolicGerente from "./pages/SolicGerente";
import SolicCliente from "./pages/SolicCliente";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
    />
      <BrowserRouter>
        <Header />

        <main className="pt-36 pb-10 pl-6 pr-6 min-h-[100vh] h-auto max-w-full">
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/informacoes-pedido/:id" element={<PedidoCliente />} />
            <Route path="/cliente/pedidos" element={<PedidosCliente />} />
            <Route path="/cliente/plano/:id" element={<AssinarPlano />} />
            <Route path="/cliente/planos/" element={<PlanosCliente />} />
            <Route path="/cliente/solicitacoes" element={<SolicCliente />} />
            <Route path="/cliente/solicitar" element={<SolicReciclagem />} />
            <Route path="/cliente/acompanhar/:id" element={<AcompSolic />} />
            <Route path="/pagamento" element={<Pagamento />} />

            <Route path="/gerente/pedidos" element={<PedidosGerente />} />
            <Route path="/gerente/pedido" element={<CancelarPedido />} />
            <Route path="/gerente/planos" element={<PlanosGerente />} />
            <Route path="/gerente/editar-plano/:id" element={<EditarPlano />} />
            <Route path="/gerente/solicitacoes" element={<SolicGerente />} />
            <Route path="/gerente/analisar/:id" element={<AnalisarSolic />} />
            <Route path="/gerente/criar-plano" element={<CriarPlano />} />
            <Route path="/gerente/criar-produto" element={<CriarProduto />} />
            <Route path="/gerente/alterar-produto/:id" element={<AlteraProduto />} />

            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            <Route path="/dados-cliente" element={<EditarExcluirCliente />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;



