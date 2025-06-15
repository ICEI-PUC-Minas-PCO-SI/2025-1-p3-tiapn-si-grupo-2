import React from "react";
import FormCadastroCliente from "../../components/FormCadastroCliente/FormCadastroCliente";
import Sidebar from "../../components/Sidebar/Sidebar";

const CadastroCliente = () => {
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7x1 mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Cliente</h1>
              <p className="text-lg text-gray-600">Insira um novo cliente</p>
            </div>
          </div>
        </div>
        <FormCadastroCliente />
      </div>
    </>


  );
};

export default CadastroCliente;
