import React from 'react'
import ListCardsTotalItems from '../ListCardsTotalItems/ListCardsTotalItems'
import CardManutencoesPendentes from '../CardManutencoesPendentes/CardManutencoesPendentes'

const MainContent = () => {
  return (
    <div className='p-10 w-full'>
      <h1 className='font-bold text-4xl'>Dashboard</h1>
      <ListCardsTotalItems />
      <CardManutencoesPendentes />
    </div>
  )
}

export default MainContent
