import React from 'react'
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import { Link } from 'react-router-dom'
import BotaoCancelar from '../BotaoCancelar/BotaoCancelar'
import BotaoSalvar from '../BotaoSalvar/BotaoSalvar'
import SelectForm from '../SelectForm/SelectForm'
import DataForm from '../DataForm/DataForm'
const FormCadastroEquipamentos = () => {
  return (
    <div>
      <form action="" className="py-4 flex flex-col gap-5">
        <div className="grid grid-cols-3 gap-y-5 gap-x-0 mt-5 place-items-left">
          <InputForm content="Cliente" />
          <SelectForm selectTitle="Tipo" selectFormList={["Solda", "Hidráulica", "Içamento e Carga", "Elétrica", "Torque", "Roscas", "Tubos"]}/>
          <InputForm content="Marca" />
          <InputForm content="Status" />    
          <InputForm content="Serial Number" />    
          <DataForm content="Data Entrada" />    
          <DataForm content="Data Saída" />       
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
