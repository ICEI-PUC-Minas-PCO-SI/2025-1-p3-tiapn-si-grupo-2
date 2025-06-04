import React from 'react'
import ManutencoesPendentes from '../ManutencoesPendentes/ManutencoesPendentes'

const ListManutencoes = () => {
  return (
    <div>
      <ul className='mt-4 flex flex-col gap-2'>
        <ManutencoesPendentes />
        <ManutencoesPendentes />
        <ManutencoesPendentes />
        <ManutencoesPendentes />
        <ManutencoesPendentes />
        <ManutencoesPendentes />
       
      </ul>
    </div>
  )
}

export default ListManutencoes
