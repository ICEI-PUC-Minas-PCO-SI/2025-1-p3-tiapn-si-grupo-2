import React from 'react'
import ListManutencoes from '../ListManutencoes/ListManutencoes'

const CardManutencoesPendentes = () => {
  return (
    <div className='p-6 rounded-md w-4/10 flex flex-col mt-10 h-3/6 overflow-auto shadow-md hover:cursor-pointer '>
      <h1 className='text-xl font-bold'>Manutenções Pendentes</h1>
      <ListManutencoes />
    </div>
  )
}

export default CardManutencoesPendentes
