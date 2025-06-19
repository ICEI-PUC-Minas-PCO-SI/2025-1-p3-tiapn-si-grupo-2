import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; 
import TableManutencoes from "../../components/TableManutencoes/TableManutencoes";

const Manutencoes = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Manutenções ativas</h1>
        <TableManutencoes />
      </div>
    </div>
  )
}

export default Manutencoes