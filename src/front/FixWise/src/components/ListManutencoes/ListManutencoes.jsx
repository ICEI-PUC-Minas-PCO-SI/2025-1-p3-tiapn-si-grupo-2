import React from 'react'
import ManutencoesPendentes from '../ManutencoesPendentes/ManutencoesPendentes'
import { IoCog, IoCalendar, IoHammer, IoAlertSharp } from 'react-icons/io5'

const ListManutencoes = () => {
  const dadosManutencoes = [
    {
      id: 'MT-2023-0015',
      equipamento: 'Prensa Hidráulica',
      tecnico: 'Carlos Silva',
      dataChegada: '2023-05-15',
      status: 'Pendente',
      prioridade: 'Alta'
    },
    {
      id: 'MT-2023-0018',
      equipamento: 'Serra Elétrica',
      tecnico: 'Ana Oliveira',
      dataChegada: '2023-05-18',
      status: 'Pendente',
      prioridade: 'Média'
    },
    {
      id: 'MT-2023-0022',
      equipamento: 'Solda MIG',
      tecnico: 'Pedro Santos',
      dataChegada: '2023-05-20',
      status: 'Pendente',
      prioridade: 'Baixa'
    }
  ]
  return (
    <>
      <div className="w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nº Manutenção
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipamento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Técnico Responsável
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data de Chegada
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              dadosManutencoes.map((manutencao) => (
                <tr key={manutencao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoHammer className="flex-shrink-0 h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">{manutencao.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{manutencao.equipamento}</div>
                    <div className="text-xs text-gray-500">
                      {manutencao.prioridade === 'Alta' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Alta Prioridade
                        </span>
                      )}
                      {manutencao.prioridade === 'Média' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Média Prioridade
                        </span>
                      )}
                      {manutencao.prioridade === 'Baixa' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Baixa Prioridade
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoCog className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{manutencao.tecnico}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoCalendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(manutencao.dataChegada).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoAlertSharp className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {manutencao.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>

    // <div>
    //   <ul className='mt-4 flex flex-col gap-2'>
    //     <ManutencoesPendentes />
    //     <ManutencoesPendentes />
    //     <ManutencoesPendentes />
    //     <ManutencoesPendentes />
    //     <ManutencoesPendentes />
    //     <ManutencoesPendentes />

    //   </ul>
    // </div>
  )
}

export default ListManutencoes
