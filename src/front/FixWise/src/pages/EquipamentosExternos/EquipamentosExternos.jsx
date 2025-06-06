import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import TableEquipamentosExternos from "../../components/TableEquipamentosExternos/TableEquipamentosExternos";

const EquipamentosExternos = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="p-10 w-full ">
        <h1 className='font-bold text-4xl'>Equipamentos externos</h1>
        <TableEquipamentosExternos />
      </div>
    </div>
  )
}

export default EquipamentosExternos
