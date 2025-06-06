import React from 'react'
import CardsTotalItems from '../CardsTotalItems/CardsTotalItems'
import { IoPersonOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { GrVmMaintenance } from "react-icons/gr";
import { useState } from 'react';
import { useEffect } from 'react';

const ListCardsTotalItems = () => {

  const [numberClientes, setNumberClientes] = useState('');
  
  
  
  useEffect(() =>{
    fetch('http://localhost:3000/clientes')
    .then(response => response.json())
    .then(data => setNumberClientes(data.length))
  })

  return (
    <div className='flex justify-between mt-10'>
      <CardsTotalItems title="Total de Clientes" tagItem={IoPersonOutline} number={numberClientes}/>
      <CardsTotalItems title="Produtos Cadastrados" tagItem={CiBoxes} number="1"/>
      <CardsTotalItems title="Manutenções Ativas" tagItem={GrVmMaintenance} number="6"/>
      <CardsTotalItems title="Alertas" tagItem={IoPersonOutline} number="0"/>
    </div>
  )
}

export default ListCardsTotalItems
