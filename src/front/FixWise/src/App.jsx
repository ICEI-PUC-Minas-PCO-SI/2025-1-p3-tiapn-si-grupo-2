import './App.css'
import Home from './components/Home/Home'
import { Routes, Route } from 'react-router-dom'
import CadastroCliente from './components/CadastroCliente/CadastroCliente'
import CadastroAcessos from './components/CadastroAcessos/CadastroAcessos'
import CadastroEquipamentos from './components/CadastroEquipamentos/CadastroEquipamentos'
import CadastroManutencao from './components/CadastroManutencao/CadastroManutencao'
import EquipamentosExternos from './components/EquipamentosExternos/EquipamentosExternos'
import EquipamentosInternos from './components/EquipametosInternos/EquipamentosInternos'
import Clientes from './components/Clientes/Clientes'
import Manutencoes from './components/Manutencoes/Manutencoes'
import Configuracoes from './components/Configuracoes/Configuracoes'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cadastro-clientes' element={<CadastroCliente />} />
        <Route path='/cadastro-acessos' element={<CadastroAcessos/>} />
        <Route path='/cadastro-equipamentos' element={<CadastroEquipamentos />} />
        <Route path='/cadastro-manutencao' element={<CadastroManutencao />} />
        <Route path='/internos' element={<EquipamentosInternos />} />
        <Route path='/externos' element={<EquipamentosExternos />} />
        <Route path='/clientes' element={<Clientes />} />
        <Route path='/manutencoes' element={<Manutencoes />} />
        <Route path='/configuracoes' element={<Configuracoes />} />
      </Routes>
    </>
  )
}

export default App
