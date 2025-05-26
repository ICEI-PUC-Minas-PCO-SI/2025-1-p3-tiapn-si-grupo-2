import React from "react";
import FormCadastroCliente from "../FormCadastroCliente/FormCadastroCliente";
import Sidebar from "../Sidebar/Sidebar";

const CadastroCliente = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full h-full">
        <h1 className="font-bold text-4xl">Cadastro Cliente</h1>
        <FormCadastroCliente />
      </div>
    </div>
  );
};

export default CadastroCliente;
