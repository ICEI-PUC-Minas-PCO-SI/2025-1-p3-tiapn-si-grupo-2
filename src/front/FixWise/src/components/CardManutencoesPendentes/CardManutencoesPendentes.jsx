import React from 'react'
import ListManutencoes from '../ListManutencoes/ListManutencoes'

const CardManutencoesPendentes = () => {
  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Manutenções Pendentes</h3>
        </div>
        <div className="px-4 py-12 sm:px-6 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <ListManutencoes />
            </div>
          </div>
      </div>
    </>
    // <div className='p-6 rounded-md w-[600px] flex flex-col mt-10 h-3/6 overflow-auto shadow-md hover:cursor-pointer '>
    //   <h1 className='text-xl font-bold'>Manutenções Pendentes</h1>
    //   <ListManutencoes />
    // </div>
  )
}

export default CardManutencoesPendentes
