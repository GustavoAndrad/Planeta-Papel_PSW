import "./style/index.css";
import "./style/generated.css";
import Footer from "./components/Footer";
import Header from "./components/Header"
import Catalogo from "./pages/Catalogo";
import Carrinho from "./pages/Carrinho";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

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
          </Routes>
        </BrowserRouter>
      
      </main>

      <Footer />
    </>
  );
}

export default App;

