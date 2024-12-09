import { useDispatch, useSelector } from "react-redux"; // Importando useSelector e useDispatch
import { fetchUsers, userSelectors } from "../redux/usuarioSlice"; // Importando a ação fetchUsers
import LoginCliente from "../components/Login/LoginCliente";
import { useState, useEffect } from "react";
import LoginGerente from "../components/Login/LoginGerente";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [isGerente, setIsGerente] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [usuario, setUsuario] = useState({});
  
    // Pegando todos os usuários da store com o useSelector
    const usuarios = useSelector((state) => userSelectors.selectAll(state));

  
    // Estado para armazenar IDs dos gerentes
    const [gerentesIds, setGerentesIds] = useState([]);
  
    // Função para pegar IDs dos gerentes
    const getGerentes = () => {
      return usuarios.filter(usuario => usuario.isGerente).map(usuario => usuario.id);
    };
  
    // Disparando a busca de usuários quando o componente é montado
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
    // Atualizando os IDs dos clientes e gerentes quando os usuários mudam
    useEffect(() => {
      setGerentesIds(getGerentes());
    }, [usuarios]);
  
    // Função para buscar usuário por email
    const usuarioByEmail = (email) => {
      return usuarios.find((usuario) => usuario.email === email);
    };

    const createSession = ()=>{
        localStorage.setItem("id", usuario.id);
        localStorage.setItem("gerente", usuario.isGerente);
    }
  
    const handleLogin = (e) => {
      e.preventDefault();
      console.log("Verificando Login...");
  
      setUsuario(usuarioByEmail(email));

      if (usuario && usuario.senha === password) {
        if (gerentesIds.includes(usuario.id)) {
          setIsGerente(true);
        } else {
          createSession()
          navigate("/"); // Navegação para a página principal dos clientes
        }
      } else {
        console.log("Usuário ou senha inválidos");
        // Lógica de erro de autenticação, por exemplo, exibir mensagem de erro
      }
    };

  const handleLoginRestrito = (e) => {
    e.preventDefault();
     console.log("Validando chaves de acesso...");
     if(usuario.codigoSeguranca === securityCode && usuario.cpf === cpf ){
          createSession();
          navigate("/");
     } else{
        console.log(usuario)
     }
  }

  return (
    <section className="dark:bg-gray-900 h-auto">
      <div className="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-3/4 lg:py-0 lg:min-w-[600px]">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {isGerente ? (
            <LoginGerente
              handleLoginRestrito={handleLoginRestrito}
              cpf={cpf}
              securityCode={securityCode}
              setCpf={setCpf}
              setSecurityCode={setSecurityCode}
              setIsGerente={setIsGerente}
            />
          ) : (
            <LoginCliente
              handleLogin={handleLogin}
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
