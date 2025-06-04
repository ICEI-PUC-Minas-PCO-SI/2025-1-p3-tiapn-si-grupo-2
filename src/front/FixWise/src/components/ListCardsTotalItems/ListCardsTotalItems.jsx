import React from 'react'
import CardsTotalItems from '../CardsTotalItems/CardsTotalItems'
import { IoPersonOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { GrVmMaintenance } from "react-icons/gr";

const ListCardsTotalItems = () => {
  return (
    <div className='flex justify-between mt-10'>
      <CardsTotalItems title="Total de Clientes" tagItem={IoPersonOutline} number="0"/>
      <CardsTotalItems title="Produtos Cadastrados" tagItem={CiBoxes} number="0"/>
      <CardsTotalItems title="Manutenções Ativas" tagItem={GrVmMaintenance} number="6"/>
      <CardsTotalItems title="Alertas" tagItem={IoPersonOutline} number="0"/>
    </div>
  )
}

export default ListCardsTotalItems
