import React from 'react'
import FormLogin from '../../components/FormLogin/FormLogin'
import LogoFixWise from '../../assets/logo/Poppins/4 - Sem fundo.png'

const Login = () => {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col'>
        <img className='w-[300px]' src={LogoFixWise} alt="" />
      <FormLogin />
    </div>
  )
}

export default Login
