import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import FormCadastroAcesso from '../../components/FormCadastroAcesso/FormCadastroAcesso'

const CadastroAcessos = () => {
  return (
    <div className='flex min-h-screen'>
    <Sidebar />
        <div className='p-10 w-full'>
        <h1 className='font-bold text-4xl'>Cadastro Acessos</h1>
            <FormCadastroAcesso />
        </div>
      
    </div>
  )
}

export default CadastroAcessos
