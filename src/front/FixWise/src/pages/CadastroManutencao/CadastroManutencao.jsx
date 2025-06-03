import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import FormCadastroManutencao from '../../components/FormCadastroManutencao/FormCadastroManutencao'

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
