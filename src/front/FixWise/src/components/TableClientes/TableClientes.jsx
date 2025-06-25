import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  IoCreateOutline,
  IoTrashOutline,
  IoSearch,
  IoFunnelOutline,
} from "react-icons/io5";
import Swal from "sweetalert2";

const TableClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState("");

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cliente");
      setClientes(res.data.clientes);
      console.log(res);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleEdit = (cliente) => {
    navigate(`/clientes/editar/${cliente.idCliente}`, {
      state: { cliente },
    });
  };

  const handleDelete = async (idCliente, navigate) => {
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
          `http://localhost:3010/cliente/${idCliente}`
        );

        console.log(response);
        // Mostra mensagem de sucesso
        await Swal.fire({
          title: "Deletado!",
          text: "O cliente foi removido com sucesso.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });
        setClientes(
          clientes.filter((cliente) => cliente.idCliente !== idCliente)
        );
        // Redireciona ou atualiza a lista
        getClientes();
        // navigate('/equipamentos');
        // Ou: window.location.reload(); se preferir recarregar a página
      } catch (error) {
        // Mostra mensagem de erro
        await Swal.fire({
          title: "Erro!",
          text:
            error.response?.data?.message ||
            "Ocorreu um erro ao deletar o cliente",
          icon: "error",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });
      }
    }
  };

  useEffect(() => {
    getClientes();
  }, [setClientes]); // <- Corrigido aqui: só executa uma vez

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.Nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.CPF_CNPJ.toLowerCase().includes(busca.toLowerCase())
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
                  placeholder="Buscar por nome ou CNPJ/CPF"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

            
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
                  CNPJ/CPF
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  E-mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Cidade
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  UF
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
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente, index) => (
                  <tr
                    key={cliente.idCliente}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.idCliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cliente.Nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.CPF_CNPJ}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.EmailContato}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.Cidade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.UF}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleEdit(cliente)}
                        >
                          <IoCreateOutline className="h-5 w-5" />
                        </button>

                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 cursor-pointer"
                          onClick={() =>
                            handleDelete(cliente.idCliente, navigate)
                          }
                        >
                          <IoTrashOutline className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Paginação (opcional) */}
        {clientesFiltrados.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">{clientesFiltrados.length}</span> de {""}
                  <span className="font-medium">{clientes.length}</span> resultados
                </p>
              </div>
            </div>
          </div>
        )}

    </>
  );
};

export default TableClientes;
