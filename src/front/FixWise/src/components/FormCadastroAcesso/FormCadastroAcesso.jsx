import React from 'react'
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import BotaoCancelar from '../BotaoCancelar/BotaoCancelar'
import BotaoSalvar from '../BotaoSalvar/BotaoSalvar'
import { Link } from 'react-router-dom'

const FormCadastroAcesso = () => {
  return (
    <div>
      <form action="" className="p-4 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-5 mt-5  ">
          <InputForm content="CPF" />
          <InputForm content="Nome" />
          <InputForm content="Matrícula" />
          <InputForm content="Nível de acesso" />    
        </div>
        <div className="flex flex-col gap-5">
        <TextAreaForm content="Descrição"/>
        <TextAreaForm content="Observações"/>
        </div>
        <div className="flex gap-5 mt-5">
        <Link to="/"><BotaoCancelar /></Link>
            <BotaoSalvar />
        </div>
      </form>
    </div>
  )
}

export default FormCadastroAcesso
