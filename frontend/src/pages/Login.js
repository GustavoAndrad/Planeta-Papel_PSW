import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, userSelectors } from "../redux/usuarioSlice";
import LoginCliente from "../components/Login/LoginCliente";
import { useState, useEffect, useCallback } from "react";
import LoginGerente from "../components/Login/LoginGerente";
import { useNavigate } from "react-router-dom";
import { loginRestrictValidationSchema, loginValidationSchema } from "../YupSchema/loginSchema";
import { toast } from 'react-toastify';

 
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isGerente, setIsGerente] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [usuario, setUsuario] = useState({});
  

  const usuarios = useSelector((state) => userSelectors.selectAll(state));
  const [gerentesIds, setGerentesIds] = useState([]);

  // Função para pegar IDs dos gerentes
  const getGerentes = useCallback(() => {
    return usuarios.filter(usuario => usuario.isGerente).map(usuario => usuario.id);
  },[usuarios]); 

  // Disparando a busca de usuários quando o componente é montado
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Atualizando os IDs dos clientes e gerentes quando os usuários mudam
  useEffect(() => {
    setGerentesIds(getGerentes());
  }, [getGerentes]);

  // Função para buscar usuário por email
  const usuarioByEmail = (email) => {
    return usuarios.find((usuario) => usuario.email === email);
  };

  const handleEmailChange = (email)=>{
    setEmail(email);
    const user = usuarioByEmail(email);
    setUsuario(user)
  }

  const createSession = () => {
    localStorage.setItem("id", usuario.id);
    localStorage.setItem("gerente", usuario.isGerente);
    toast.success("Sessão iniciada!")
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Validação com Yup
      await loginValidationSchema.validate({ email, password}, { abortEarly: false });

      if (usuario && usuario.senha === password) {
        if (gerentesIds.includes(usuario.id)) {
          setIsGerente(true);
        } else {
          createSession();
          navigate("/"); // Navegação para a página principal dos clientes
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      } else {
        toast.error("Usuário ou senha inválidos");
      }
    } catch (e) {
      e.inner.forEach((err) => {
        toast.error(`${err.message}`);
      });
    }
  };

  const handleLoginRestrito = async (e) => {
    e.preventDefault();

    try {
      // Validação com Yup para gerentes
      await loginValidationSchema.validate({ email, password}, { abortEarly: false });

      await loginRestrictValidationSchema.validate({cpf, securityCode}, { abortEarly: false });

      if (usuario.codigoSeguranca === securityCode && usuario.cpf === cpf) {
        createSession();
        navigate("/");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      } else {
        toast.error("Código de segurança ou CPF incorretos");
      }
    } catch (e) {
      e.inner.forEach((err) => {
        toast.error(`${err.message}`);
      });
    }
  };

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
              setEmail={handleEmailChange}
              setPassword={setPassword}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
