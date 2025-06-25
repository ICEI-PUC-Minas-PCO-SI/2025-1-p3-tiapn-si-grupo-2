import ListCardsTotalItems from '../ListCardsTotalItems/ListCardsTotalItems'
import CardManutencoesPendentes from '../CardManutencoesPendentes/CardManutencoesPendentes'
import { IoCalendar } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import HistoricoAtividades from '../HistoricoAtividades/HistoricoAtividades'
import GraficoManutencoesPorMes from '../GraficoManutencoesPorMes/GraficoManutencoesPorMes'
import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
  const { user, loading } = useAuth(); // Pega o usuário e o estado de carregamento
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

  // 1. Adicione a verificação de loading
  if (loading) {
    return (
      <div className="p-6 bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-700">Carregando Dashboard...</div>
      </div>
    );
  }

  // 2. Adicione a verificação se o usuário não está autenticado (embora PrivateRoute já faça isso)
  // Isso é mais uma salvaguarda, pois PrivateRoute deveria impedir que user seja null aqui.
  if (!user) {
      return (
          <div className="p-6 bg-white min-h-screen flex items-center justify-center">
              <div className="text-xl text-gray-700">Acesso negado. Redirecionando para login...</div>
              {/* O PrivateRoute já cuida do redirecionamento, mas esta é uma boa prática */}
          </div>
      );
  }

  return (
    <>
      <div className="p-6 bg-white min-h-screen">
        <div className="max-w-7x1 mx-auto">
          {/* Cabeçalho com saudação */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {saudacao}, {user?.Nome || user?.email || 'Usuário'}! {/* <--- AQUI ESTÁ A CORREÇÃO */}
              {/* Use optional chaining (?. ) e fallback para user.Nome ou user.email */}
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
          <div>
            
          </div>
          <GraficoManutencoesPorMes />
          <HistoricoAtividades />
        </div>
      </div>
    </>
  )
}

export default Dashboard