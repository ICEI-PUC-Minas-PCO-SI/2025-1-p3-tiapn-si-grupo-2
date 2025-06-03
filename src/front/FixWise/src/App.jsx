import './App.css'
import Home from './pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import CadastroCliente from './pages/CadastroCliente/CadastroCliente'
import CadastroAcessos from './pages/CadastroAcessos/CadastroAcessos'
import CadastroEquipamentos from './pages/CadastroEquipamentos/CadastroEquipamentos'
import CadastroManutencao from './pages/CadastroManutencao/CadastroManutencao'
import EquipamentosExternos from './pages/EquipamentosExternos/EquipamentosExternos'
import EquipamentosInternos from './pages/EquipametosInternos/EquipamentosInternos'
import Clientes from './pages/Clientes/Clientes'
import Manutencoes from './pages/Manutencoes/Manutencoes'
import Login from './pages/Login/Login'

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
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
