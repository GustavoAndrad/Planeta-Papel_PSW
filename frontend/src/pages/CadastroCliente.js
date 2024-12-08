import React from "react";
import CustomerForm from "../components/CadastroCliente/CustomerForm";

const CadastroCliente = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto mt-6 p-4">
        <div className="flex items-center mb-6">
          <img
            src="../images/cadastro.png"
            alt="Cadastro de Clientes"
            className="w-11 h-11 mr-2 transform scale-x-[-1]"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold" style={{ color: '#2A5EAD' }}>
              Cadastro de Clientes
            </h1>
            <h2 className="text-md" style={{ color: '#2A5EAD' }}>
              Preencha os dados abaixo
            </h2>
          </div>
        </div>
        <CustomerForm />
      </div>
    </div>
  );
};

export default CadastroCliente;

