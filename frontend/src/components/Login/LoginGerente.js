
function LoginGerente(props) {

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <img
        onClick={() => {props.setIsGerente(false)}}
        className="w-5 h-5 cursor-pointer"
        src="/images/seta_esquerda.png"
        alt="Botão voltar"
        title="Voltar"
      />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Essa é uma <span className="text-red-600">Área Restrita</span>
      </h1>

      <div>
        <label
          htmlFor="cpf"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          CPF (com pontos)
        </label>
        <input
          type="text"
          name="cpf"
          id="cpf"
          value={props.cpf}
          onChange={(e) => props.setCpf(e.target.value)}
          placeholder="000.000.000-00"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="securityCode"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Código de Segurança
        </label>
        <input
          type="password"
          name="securityCode"
          id="securityCode"
          value={props.securityCode}
          onChange={(e) => props.setSecurityCode(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <button
        onClick={props.handleLoginRestrito}
        className="mt-4 w-full bg-primaryBlue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Entrar no Portal do Gerente
      </button>
    </div>
  );
}

export default LoginGerente;
