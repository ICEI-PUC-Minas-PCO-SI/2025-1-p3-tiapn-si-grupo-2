import React from 'react'
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import { Link } from 'react-router-dom'
import BotaoCancelar from '../BotaoCancelar/BotaoCancelar'
import BotaoSalvar from '../BotaoSalvar/BotaoSalvar'
const FormCadastroEquipamentos = () => {
  return (
    <div>
      <form action="" className="p-4 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          <InputForm content="Cliente" />
          <InputForm content="Tipo" />
          <InputForm content="Marca" />
          <InputForm content="Status" />    
          <InputForm content="Serial Number" />    
          <InputForm content="Data Entrada" />    
          <InputForm content="Data Saída" />       
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

export default FormCadastroEquipamentos
