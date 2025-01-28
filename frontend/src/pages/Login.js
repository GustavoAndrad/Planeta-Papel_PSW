import LoginCliente from "../components/Login/LoginCliente";
import { useState } from "react";
import LoginGerente from "../components/Login/LoginGerente";
import { useNavigate } from "react-router-dom";
import { loginRestrictValidationSchema, loginValidationSchema } from "../YupSchema/loginSchema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUsers, login} from "../redux/usuarioSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isGerente, setIsGerente] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const createSession = async () => {
    try {
      const response = await dispatch(
        login({ email, senha: password, cpf, codigoSeguranca: securityCode })
      );
      const { status, token, error } = response.payload;

      if (!status && error === "Necessário verificação!") {
        toast.warn(error);
        setIsGerente(true);
        return;
      }

      if (!status) {
        throw new Error(error);
      }

      // Armazan token no localStorage
      localStorage.setItem("token", token);

      // Busca as informações do usuário
      const responseUser = await dispatch(fetchUsers());

      if (!responseUser.payload?.status) {
        localStorage.removeItem("token");
        throw new Error(responseUser.payload?.error || "Erro ao buscar usuário");
      }

      const usuario = responseUser.payload.usuario;

      // Armazena os dados no localStorage
      localStorage.setItem("id", usuario.id);
      localStorage.setItem("gerente", usuario.isGerente);

      return usuario;
    } catch (e) {
      toast.error(e.message);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });

      const userData = await createSession();

      if (userData) {
        if (userData.isGerente) {
          setIsGerente(true);
        } else {
          navigate("/");
          window.location.reload(); // Força o recarregamento
          toast.success("Sessão iniciada!");
        }
      }
    } catch (e) {
      e.inner?.forEach((err) => toast.error(`${err.message}`));
    }
  };

  const handleLoginRestrito = async (e) => {
    e.preventDefault();

    try {
      await loginValidationSchema.validate({ email, password }, { abortEarly: false });
      await loginRestrictValidationSchema.validate({ cpf, securityCode }, { abortEarly: false });

      const user = await createSession();

      if (user) {
        navigate("/");
        window.location.reload();
        toast.success("Sessão iniciada!");
        toast.info("Você está logodo como gerente!")
      }
    } catch (e) {
      e.inner?.forEach((err) => toast.error(`${err.message}`));
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
