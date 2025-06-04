import React from 'react'

const ManutencoesPendentes = (props) => {
  return (
    <div>
        <li className='flex items-center justify-between'>
            <div>
                <p className='font-medium'>Manutencao1</p>
                <p className='text-gray-600'>Cliente: Empresa A</p>
            </div>
            <p className='bg-orange-200 text-amber-800 py-1 px-2 rounded-full'>Pendente</p>
        </li>
    </div>
  )
}

export default ManutencoesPendentes
