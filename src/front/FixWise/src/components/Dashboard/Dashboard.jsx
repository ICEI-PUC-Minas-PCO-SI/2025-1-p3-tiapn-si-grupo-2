import ListCardsTotalItems from '../ListCardsTotalItems/ListCardsTotalItems'
import CardManutencoesPendentes from '../CardManutencoesPendentes/CardManutencoesPendentes'
import { IoCalendar } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import HistoricoAtividades from '../HistoricoAtividades/HistoricoAtividades'
import GraficoManutencoesPorMes from '../GraficoManutencoesPorMes/GraficoManutencoesPorMes'

const Dashboard = () => {
  const [saudacao, setSaudacao] = useState(getSaudacao());
  const [currentTime, setCurrentTime] = useState(new Date());

  function getSaudacao() {
    const horaAtual = new Date().getHours();

    if (horaAtual >= 5 && horaAtual < 12) {
      return 'Bom dia';
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSaudacao(getSaudacao());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(timer);
  }, []);

  const formatarData = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-7x1 mx-auto">
          {/* Cabeçalho com saudação */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {saudacao}, Amigo!
            </h1>
            <div className="flex items-center text-gray-600">
              <IoCalendar className="h-5 w-5 mr-2" />
              <p className="text-lg">{formatarData(currentTime)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <ListCardsTotalItems />
          </div>

          <CardManutencoesPendentes />
          <GraficoManutencoesPorMes />
          <HistoricoAtividades />
        </div>
      </div>
    </>
  )
}

export default Dashboard
