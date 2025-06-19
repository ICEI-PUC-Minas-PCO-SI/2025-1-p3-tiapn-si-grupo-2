import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableClientes from "../../components/TableClientes/TableClientes"

const Clientes = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Clientes</h1>
        <TableClientes />
      </div>
    </div>
  )
}

export default Clientes
