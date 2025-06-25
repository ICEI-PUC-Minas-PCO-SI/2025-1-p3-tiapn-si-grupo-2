import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCheckmark, IoEye, IoEyeOff } from "react-icons/io5";
// Importe seus componentes personalizados
import InputForm from "../InputForm/InputForm";

export default function FormCadastroFuncionarios() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    senha: "",
    confirmSenha: "",
    tipo: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && state?.funcionario) {
      const funcionario = state.funcionario;
      // console.log('cliente recebido:', cliente);

      setFormData({
        nome: funcionario.Nome || "",
        tipo: funcionario.TipoUsuario || "",
      });
    }
  }, [isEditing, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome) {
      Swal.fire("Atenção", "Informe o nome!", "warning");
      return;
    }

    if (!formData.senha) {
      Swal.fire("Atenção", "Informe a senha!", "warning");
      return;
    }

    if (formData.senha != formData.confirmSenha) {
      Swal.fire("Atenção", "Senhas são diferentes!", "warning");
      return;
    }

    console.log(formData);

    if (!formData.tipo) {
      Swal.fire("Atenção", "Informe o tipo!", "warning");
      return;
    }

    try {
      const payload = {
        Nome: formData.nome,
        Senha: formData.senha,
        TipoUsuario: +formData.tipo,
      };

      if (isEditing) {
        payload.idUsuario = id;

        await axios.put(`http://localhost:3010/funcionario/${id}`, payload);
        Swal.fire("Sucesso", "Registro atualizado com sucesso", "success");
      } else {
        await axios.post("http://localhost:3010/funcionario", payload);
        Swal.fire("Sucesso", "Registro incluído com sucesso", "success");
      }

      navigate("/funcionarios");
    } catch (error) {
      Swal.fire(
        "Erro",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow overflow-hidden rounded-lg p-6"
      >
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
            Informações do Funcionário
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nome *
                </label>
                <InputForm
                  name="nome"
                  content="Nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Senha *
                </label>
                <div className="relative w-full">
                  <input
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    name="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    {showPassword ? (
                      <IoEyeOff
                        className="h-5 w-5 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <IoEye
                        className="h-5 w-5 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="tipo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tipo *
                </label>

                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option key={0} value="">
                    -- Informe uma opção --
                  </option>
                  <option key={1} value={1}>
                    Administrador
                  </option>
                  <option key={2} value={2}>
                    Funcionário
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="confirmSenha"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirma Senha *
                </label>
                <div className="relative w-full">
                  <input
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    name="confirmSenha"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmSenha}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    {showPassword ? (
                      <IoEyeOff
                        className="h-5 w-5 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <IoEye
                        className="h-5 w-5 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <Link to={"/funcionarios"}>
            <button
              type="button"
              className=" cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
          </Link>

          <button
            type="submit"
            className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <IoCheckmark className="-ml-1 mr-2 h-5 w-5" />
            Salvar Funcionário
          </button>
        </div>
      </form>
    </div>
  );
}
