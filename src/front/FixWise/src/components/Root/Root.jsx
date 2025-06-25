import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext'; // Importe seu AuthProvider

const Root = () => {
  return (
    // O AuthProvider envolve o Outlet e outros componentes que precisam do AuthContext
    <AuthProvider>
      {/* O Outlet renderiza os componentes de rota aninhados */}
      <Outlet />
    </AuthProvider>
  );
};

export default Root;