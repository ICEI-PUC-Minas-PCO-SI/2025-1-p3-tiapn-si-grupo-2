import './App.css'
import Home from './pages/Home/Home'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import CadastroCliente from './pages/CadastroCliente/CadastroCliente'
import CadastroAcessos from './pages/CadastroAcessos/CadastroAcessos'
import CadastroEquipamentos from './pages/CadastroEquipamentos/CadastroEquipamentos'
import CadastroManutencao from './pages/CadastroManutencao/CadastroManutencao'
import EquipamentosExternos from './pages/EquipamentosExternos/EquipamentosExternos'
import EquipamentosInternos from './pages/EquipametosInternos/EquipamentosInternos'
import Clientes from './pages/Clientes/Clientes'
import Manutencoes from './pages/Manutencoes/Manutencoes'
import Login from './pages/Login/Login'
import Equipamentos from './pages/Equipamentos/Equipamentos'
import Sidebar from './components/Sidebar/Sidebar'
import Funcionarios from './pages/Funcionarios/Funcionarios'
import CadastroFuncionarios from './pages/CadastroFuncionarios/CadastroFuncionarios'
import LoginPage from './pages/Login/Login'

function App() {

  const Layout = () => {
    return (
      <>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col px-8 py-6 w-full">
            <Outlet />
          </div>
        </div>
      </>
    );
  }

  const router = createBrowserRouter(
    [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />
          },

          {
            path: '/manutencoes',
            element: <Manutencoes />
          },
          {
            path: '/clientes',
            element: <Clientes />
          },
          {
            path: '/clientes/novo',
            element: <CadastroCliente />
          },
          {
            path: '/clientes/editar/:id',
            element: <CadastroCliente />
          },
          {
            path: '/equipamentos',
            element: <Equipamentos />
          },
          {
            path: '/equipamentos/novo',
            element: <CadastroEquipamentos />
          },
          {
            path: '/equipamentos/editar/:id',
            element: <CadastroEquipamentos />
          },
          {
            path: '/manutencoes/editar/:id',
            element: <CadastroManutencao />
          },
          {
            path: '/manutencoes/novo',
            element: <CadastroManutencao />
          },
          {
            path: '/funcionarios',
            element: <Funcionarios />
          },
          {
            path: '/funcionarios/novo',
            element: <CadastroFuncionarios />
          },
          {
            path: '/funcionarios/editar/:id',
            element: <CadastroFuncionarios />
          }
        ]
      }
    ]
  )

  return (
    <RouterProvider router={router} />
    // <>
    //   <Routes>
    //     <Route path='/' element={<Home />} />
    //     <Route path='/cadastro-clientes' element={<CadastroCliente />} />
    //     <Route path='/cadastro-acessos' element={<CadastroAcessos/>} />
    //     <Route path='/cadastro-equipamentos' element={<CadastroEquipamentos />} />
    //     <Route path='/equipamentos' element={<Equipamentos />} />
    //     <Route path='/cadastro-manutencao' element={<CadastroManutencao />} />
    //     <Route path='/internos' element={<EquipamentosInternos />} />
    //     <Route path='/externos' element={<EquipamentosExternos />} />
    //     <Route path='/clientes' element={<Clientes />} />
    //     <Route path='/manutencoes' element={<Manutencoes />} />
    //     <Route path='/login' element={<Login />} />
    //   </Routes>
    // </>
  )
}

export default App
