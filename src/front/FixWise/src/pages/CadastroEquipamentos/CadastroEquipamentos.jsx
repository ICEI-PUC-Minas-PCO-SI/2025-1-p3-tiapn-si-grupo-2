import React from 'react'
import FormCadastroEquipamentos from '../../components/FormCadastroEquipamentos/FormCadastroEquipamentos'
import Sidebar from '../../components/Sidebar/Sidebar'

const CadastroEquipamentos = () => {
  return (
    <div className='flex min-h-screen'>
    <Sidebar />
        <div className='p-10 w-screen '>
        <h1 className='font-bold text-4xl'>Cadastro Equipamentos</h1>
            <FormCadastroEquipamentos />
        </div>
      
    </div>
  )
}

export default CadastroEquipamentos
