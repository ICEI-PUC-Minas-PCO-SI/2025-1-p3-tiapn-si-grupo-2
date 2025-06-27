import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { IoPerson, IoLockClosed, IoEye, IoEyeOff } from "react-icons/io5";
import logo from "../../assets/Logo.png";
import { useAuth } from "../../contexts/AuthContext"; // Importe useAuth

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const { login } = useAuth(); // Obtenha a função de login do contexto

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const storage = rememberMe ? localStorage : sessionStorage;
 
  const loadUser = () => {
  const item = localStorage.getItem("user");
  if (item) {
    const savedUser = JSON.parse(item);
    setUser(savedUser.username); // ou `savedUser.email` se o nome da chave for esse
    setRememberMe(true);
  }
};

  useEffect(() =>{
    loadUser();
  }, [])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      const success = await login(user, password); // você precisa adaptar isso pra retornar os dados

      if (!success) {
        setError("Credenciais inválidas. Tente novamente.");
         Swal.fire("Erro", "Credenciais inválidas. Tente novamente.", "error");
        return;
      }

      
      // Exemplo: vamos supor que login() retorne um token
      storage.setItem("user", JSON.stringify({ username: user }));
      storage.setItem("token", success.token); // ou como vier da API
    } catch (erro) {
      Swal.fire("Erro", "Falha no login", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-auto"
          src={logo} // Substitua pelo caminho do seu logo
          alt="FixWise"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acesse sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Usuário
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoPerson className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete=""
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <IoEyeOff className="h-5 w-5" />
                    ) : (
                      <IoEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Lembrar de mim
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Acessando..." : "Acessar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
