import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableEquipamentosInternos from "../../components/TableEquipamentosInternos/TableEquipamentosInternos";

const EquipamentosInternos = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Equipamentos internos</h1>
        <TableEquipamentosInternos />
      </div>
    </div>
  )
}

export default EquipamentosInternos
