import  { useState, useEffect } from 'react'
import ManutencoesPendentes from '../ManutencoesPendentes/ManutencoesPendentes'
import { IoCog, IoCalendar, IoHammer, IoAlertSharp } from 'react-icons/io5'
import axios from 'axios'

const ListManutencoes = () => {
  const [manutencoes, setManutencoes] = useState([])

  const getManutencoes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cadastromanutencao/manutencoes-pendentes");
      console.log('manutencoes pendentes', res)
      setManutencoes(res.data.manutencoes);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    }
  }

  useEffect(() => {
    getManutencoes();
  }, [setManutencoes]);

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
              manutencoes.length > 0 ? manutencoes.map((manutencao) => (
                <tr key={manutencao.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoHammer className="flex-shrink-0 h-4 w-4 text-blue-500 mr-2" />
                      <span className="font-medium text-gray-900">{manutencao.idManutencao}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{manutencao.nomeEquipamento}</div>
                    
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoCog className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{manutencao.nomeFuncionario}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IoCalendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(manutencao.DataEntrada).toLocaleDateString('pt-BR')}
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
              )) : <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                Nenhuma manutenção pendente encontrada
              </td>
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
