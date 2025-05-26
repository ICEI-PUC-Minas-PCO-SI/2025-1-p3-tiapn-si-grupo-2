import React from "react";
import Cliente from "../Cliente/Cliente";
import TableClientes from "../TableClientes/TableClientes";
import Sidebar from "../Sidebar/Sidebar";

const Clientes = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full flex flex-col items-center justify-center h-auto">
        <TableClientes />
      </div>
    </div>
  );
};

export default Clientes;
