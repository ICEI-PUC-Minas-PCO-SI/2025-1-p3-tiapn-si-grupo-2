import React from 'react'
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import { Link } from 'react-router-dom'
import BotaoCancelar from '../BotaoCancelar/BotaoCancelar'
import BotaoSalvar from '../BotaoSalvar/BotaoSalvar'
import DataForm from '../DataForm/DataForm'

const FormCadastroManutencao = () => {
  return (
    <div>
      <form action="" className="py-4 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-5 mt-5 ">
          <InputForm content="Cliente" />
          <InputForm content="Equipamento" />
          <DataForm content="Data Entrada" />
          <DataForm content="Data Saída" />
          <InputForm content="Responsável pela Manutenção" />
          <InputForm content="Status" />        
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

export default FormCadastroManutencao
