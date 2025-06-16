import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { IoTrashOutline, IoCreateOutline, IoSearch, IoFunnelOutline } from "react-icons/io5";

export default function TableManutencoes({ onEdit, setOnEdit }) {
  const navigate = useNavigate();
  const [manutecoes, setManutencoes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getManutencoes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cadastromanutencao");
      console.log(res.data)
    } catch (error) {
      console.error("Erro ao buscar manutencoes:", error);
    }
  };

  const handleEdit = (manutecoes) => {
    navigate(`/manutencoes/editar/${manutecoes.idManutecao}`, {
      state: { manutecoes },
    });
  };

  useEffect(() => {
    getManutencoes();
  }, [setManutencoes]);

  const handleDelete = async (idManutecao, navigate) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      background: "#fff",
    });

    if (result.isConfirmed) {
      try {
        // Faz a requisição para deletar
        const response = await axios.delete(
          `http://localhost:3010/cadastromanutencao/${idManutecao}`
        );

        console.log(response);
        // Mostra mensagem de sucesso
        await Swal.fire({
          title: "Deletado!",
          text: "A manutencao foi removida com sucesso.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });

        // Redireciona ou atualiza a lista
        getManutencoes()
        // navigate('/equipamentos');
        // Ou: window.location.reload(); se preferir recarregar a página
      } catch (error) {
        // Mostra mensagem de erro
        await Swal.fire({
          title: "Erro!",
          text:
            error.response?.data?.message ||
            "Ocorreu um erro ao deletar a manutencao",
          icon: "error",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });
      }
    }
  };

  const manutencoesFiltradas = manutecoes.filter((cadastro) =>
    cadastro.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadastro.Tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadastro.Marca.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md-justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Buscar por nome, tipo ou marca"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <IoFunnelOutline className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Filtros
              </button>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Marca
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {manutencoesFiltradas.map((cadastro, index) => (
                <tr
                  key={cadastro.idManutecao}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadastro.idManutecao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {cadastro.Nome}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadastro.Tipo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadastro.Marca}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cadastro.cliente}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        onClick={() => handleEdit(cadastro)}
                      >
                        <IoCreateOutline className="h-5 w-5" />
                      </button>

                      <button
                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                        onClick={() =>
                          handleDelete(cadastro.idManutecao, navigate)
                        }
                      >
                        <IoTrashOutline className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação (opcional) */}
      {manutencoesFiltradas.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a{" "}
                <span className="font-medium">10</span> de{" "}
                <span className="font-medium">
                  {manutencoesFiltradas.length}
                </span>{" "}
                resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Anterior</span>
                  &lt;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Próxima</span>
                  &gt;
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
