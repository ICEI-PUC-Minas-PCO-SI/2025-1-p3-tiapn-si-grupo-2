import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableAcessos from "../../components/TableAcessos/TableAcessos";

const Acessos = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Acessos</h1>
        <TableAcessos />
        
      </div>
    </div>
  )
}

export default Acessos
