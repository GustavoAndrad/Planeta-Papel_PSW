import "./style/index.css";
import "./style/generated.css";
import Footer from "./components/Footer";
import Header from "./components/Header"
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <>
      <Header />

      <main className="pt-36 pb-10 pl-6 pr-6 min-h-[100vh] h-auto max-w-full">
      
      
        {/* CONTEÚDO AQUI */}
        <Catalogo />
      
      
      </main>

      <Footer />
    </>
  );
}

export default App;

