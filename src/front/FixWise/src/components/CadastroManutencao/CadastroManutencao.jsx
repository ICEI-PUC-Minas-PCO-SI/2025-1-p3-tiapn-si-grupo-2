import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import FormCadastroManutencao from '../FormCadastroManutencao/FormCadastroManutencao'

const CadastroManutencao = () => {
  return (
    <div className='flex min-h-screen'>
    <Sidebar />
        <div className='p-10 w-full'>
        <h1 className='font-bold text-4xl'>Cadastro Manutenção</h1>
            <FormCadastroManutencao />
        </div>
      
    </div>
  )
}

export default CadastroManutencao
