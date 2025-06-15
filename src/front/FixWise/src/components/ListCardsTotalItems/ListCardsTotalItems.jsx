import CardsTotalItems from '../CardsTotalItems/CardsTotalItems'
import { IoPricetag, IoAlertCircle, IoPerson, IoCog, IoAlarm } from 'react-icons/io5'
import { CiBoxes } from "react-icons/ci";
import { GrVmMaintenance } from "react-icons/gr";
import { useState } from 'react';
import { useEffect } from 'react';

const ListCardsTotalItems = () => {

  const [numberClientes, setNumberClientes] = useState('');
  
  useEffect(() =>{
    fetch('http://localhost:3010/cliente')
    .then(response => response.json())
    .then(data => setNumberClientes(data.length))
  })

  return (
      <>
        <CardsTotalItems title="Total de Clientes" tagItem={IoPerson} number={numberClientes}/>
        <CardsTotalItems title="Produtos Cadastrados" tagItem={IoPricetag} number="0"/>
        <CardsTotalItems title="Manutenções Ativas" tagItem={IoCog} number="6"/>
        <CardsTotalItems title="Alertas" tagItem={IoAlertCircle} number="0"/>
      </>
  )
}

export default ListCardsTotalItems
