// App.jsx
import './App.css';
import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import CadastroCliente from './pages/CadastroCliente/CadastroCliente';
// ... (mantenha todas as suas outras importações de páginas)
import CadastroAcessos from './pages/CadastroAcessos/CadastroAcessos';
import CadastroEquipamentos from './pages/CadastroEquipamentos/CadastroEquipamentos';
import CadastroManutencao from './pages/CadastroManutencao/CadastroManutencao';
import Clientes from './pages/Clientes/Clientes';
import Manutencoes from './pages/Manutencoes/Manutencoes';
import Equipamentos from './pages/Equipamentos/Equipamentos';
import Sidebar from './components/Sidebar/Sidebar';
import Funcionarios from './pages/Funcionarios/Funcionarios';
import CadastroFuncionarios from './pages/CadastroFuncionarios/CadastroFuncionarios';
import LoginPage from './pages/Login/Login';

// Importe o novo componente Root
import Root from './components/Root/Root';

// Mantenha a importação de useAuth (para uso no MainLayout e PrivateRoute)
import { useAuth } from './contexts/AuthContext';


function App() {

  const MainLayout = () => {
    const { loading } = useAuth();

    if (loading) {
      return <div>Carregando aplicação...</div>;
    }

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col px-8 py-6 w-full">
          <Outlet />
        </div>
      </div>
    );
  };

  const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
      return <div>Verificando autenticação...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />, // Use o componente Root aqui como o elemento pai de todas as rotas
      children: [
        {
          path: 'login', // A rota de login agora é uma rota filha (sem '/')
          element: <LoginPage />,
        },
        {
          // O elemento raiz da aplicação protegida
          path: '/', // Rota base para o layout principal (Home, etc.)
          element: <PrivateRoute><MainLayout /></PrivateRoute>,
          children: [
            {
              index: true, // Define esta como a rota padrão para o pai
              element: <Home />,
            },
            {
              path: 'manutencoes',
              element: <Manutencoes />,
            },
            {
              path: 'clientes',
              element: <Clientes />,
            },
            {
              path: 'clientes/novo',
              element: <CadastroCliente />,
            },
            {
              path: 'clientes/editar/:id',
              element: <CadastroCliente />,
            },
            {
              path: 'equipamentos',
              element: <Equipamentos />,
            },
            {
              path: 'equipamentos/novo',
              element: <CadastroEquipamentos />,
            },
            {
              path: 'equipamentos/editar/:id',
              element: <CadastroEquipamentos />,
            },
            {
              path: 'manutencoes/editar/:id',
              element: <CadastroManutencao />,
            },
            {
              path: 'manutencoes/novo',
              element: <CadastroManutencao />,
            },
            {
              path: 'funcionarios',
              element: <Funcionarios />,
            },
            {
              path: 'funcionarios/novo',
              element: <CadastroFuncionarios />,
            },
            {
              path: 'funcionarios/editar/:id',
              element: <CadastroFuncionarios />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;