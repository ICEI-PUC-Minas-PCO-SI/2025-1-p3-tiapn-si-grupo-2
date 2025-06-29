import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {format, formatDistanceToNow} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR'
import { IoPricetag, IoAlertCircle, IoPerson, IoCog, IoAlarm } from 'react-icons/io5'

const HistoricoAtividades = () => {

  const [historicoAtividades, setHistoricoAtividades] = useState([]);
  const historicoFiltrado = historicoAtividades.sort((a, b) => new Date(b.data_registro) - new Date(a.data_registro)).slice(0, 7);

  useEffect(() => {
    const getHistoricoAtividades = async () => {
      const response = await axios.get('https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/historico-atividades');
      setHistoricoAtividades(response.data.historicoAtividades);
      console.log(response.data.historicoAtividades)
    }

    getHistoricoAtividades()
  }, [])

  return (
    <div className='bg-white overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg w-4/10'>
      <div className='px-4 py-5 sm:px-6 border-b border-gray-200'>
        <h1 className='text-lg font-semibold text-gray-800'>Atividades recentes</h1>
      </div>
      <div>
        <ul className='p-5'>
          {historicoFiltrado.map((atividade) => (
            <li key={atividade.id} className='flex gap-5 items-start my-2'>
              <div className='bg-gray-100 p-2 rounded-full'>
                {atividade.tabelaAfetada === "Cliente" ? (
                  <IoPerson className='text-2xl' />
                ) : atividade.tabelaAfetada === "Equipamento" ? (
                  <IoPricetag className='text-2xl'/>    
                ) : (
                  <IoCog className='text-2xl'/>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <p>{atividade.atividade}</p>
                <span className='text-sm text-gray-500'>{formatDistanceToNow(new Date(atividade.data_registro),{
                  locale: ptBR,
                  addSuffix: true
                })}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HistoricoAtividades