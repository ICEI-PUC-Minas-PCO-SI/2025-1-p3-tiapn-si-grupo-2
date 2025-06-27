// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook para navegação

    // Configura o token no cabeçalho padrão do Axios
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Opcional: Se quiser carregar os dados do usuário ao recarregar a página
            // e o token ainda estiver válido
            // axios.get('http://localhost:5000/api/me') // Substitua pela sua rota de usuário
            //   .then(response => setUser(response.data.user))
            //   .catch(() => {
            //     console.error("Token inválido ou expirado. Redirecionando para login.");
            //     logout();
            //   });
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const credentials =
            { 
                "Nome": email, 
                "Senha": password 
            }
            
        try {
            // Substitua 'http://localhost:5000/api/login' pela sua URL de API de login
            const response = await axios.post('http://localhost:3010/autentificador/login', credentials);
            const { token, funcionario } = response.data; // Adapte de acordo com a resposta do seu backend

            localStorage.setItem('authToken', token);
            setToken(token);
            setUser(funcionario); // Se o backend retornar os dados do usuário
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            navigate('/'); // Redireciona para a página inicial após o login
            return true;
        } catch (error) {
            console.error('Falha no login:', error.response ? error.response.data : error.message);
            // Você pode adicionar um state para exibir mensagens de erro para o usuário
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login'); // Redireciona para a página de login após o logout
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);