import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCliente(props){
    const navigate = useNavigate();
  
    return (
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <img
          onClick={() => navigate("/")}
          className="w-5 h-5 cursor-pointer"
          src="/images/seta_esquerda.png"
          alt="Botão voltar"
          title="Voltar"
        />
  
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Entrar na <span className="text-primaryBlue">Planeta Papel</span>
        </h1>
  
        <form className="space-y-4 md:space-y-6" onSubmit={props.handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
  
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
  
          <button
            type="submit"
            className="mt-4 w-full bg-primaryBlue text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Entrar
          </button>
        </form>
  
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Ainda não tem conta?{" "}
          <span
            onClick={()=>{navigate("/cadastro-cliente")}}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-primaryBlue"
          >
            Crie uma!
          </span>
        </p>
      </div>
    );
  }