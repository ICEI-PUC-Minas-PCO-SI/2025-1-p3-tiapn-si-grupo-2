import React from 'react'
import FormCadastroEquipamentos from '../FormCadastroEquipamentos/FormCadastroEquipamentos'
import Sidebar from '../Sidebar/Sidebar'

const CadastroEquipamentos = () => {
  return (
    <div className='flex h-screen'>
    <Sidebar />
        <div className='p-10 w-full'>
        <h1 className='font-bold text-4xl'>Cadastro Equipamentos</h1>
            <FormCadastroEquipamentos />
        </div>
      
    </div>
  )
}

export default CadastroEquipamentos
