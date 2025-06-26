import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate de 'react-router-dom'
import Swal from "sweetalert2";
import { IoTrashOutline, IoCreateOutline, IoSearch, IoFunnelOutline } from "react-icons/io5";
import { format } from "date-fns";

export default function TableEquipamentos() { 
  const navigate = useNavigate();
  const [equipamentos, setEquipamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getEquipamentos = async () => {
    setLoading(true);
    setError(null);
    try {
      // CORREÇÃO AQUI: A URL DEVE SER '/equipamento' (singular)
      const res = await axios.get("https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/equipamento"); 
      console.log(res.data.equipamentos)
      
      // A propriedade da resposta que contém os dados é 'equipamentos' (plural),
      // conforme mostrado na imagem do Insomnia.
      if (res.data && Array.isArray(res.data.equipamentos)) { // Acessa res.data.equipamentos
        setEquipamentos(res.data.equipamentos);
      } else {
        console.error("Formato de dados inesperado da API:", res.data);
        setError("Formato de dados recebido da API é inválido.");
        setEquipamentos([]);
      }
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
      setError(error.message || "Erro ao carregar equipamentos.");
      setEquipamentos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (equipamento) => {
    navigate(`/equipamentos/editar/${equipamento.idEquipamento}`, {
      state: { equipamento },
    });
  };

  useEffect(() => {
    getEquipamentos();
  }, []);

  const handleDelete = async (idEquipamento) => {
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
        const response = await axios.delete(
          `https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/equipamento/${idEquipamento}` // URL de delete também no singular
        );

        console.log(response);
        await Swal.fire({
          title: "Deletado!",
          text: "O equipamento foi removido com sucesso.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });

        getEquipamentos();
      } catch (error) {
        await Swal.fire({
          title: "Erro!",
          text:
            error.response?.data?.message ||
            "Ocorreu um erro ao deletar o equipamento",
          icon: "error",
          confirmButtonColor: "#3085d6",
          background: "#fff",
        });
      }
    }
  };

  const equipamentosFiltrados = equipamentos.filter((cadastro) =>
    cadastro.Nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadastro.Tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cadastro.SerialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cadastro.clienteNome && cadastro.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-700">
        Carregando equipamentos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }


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
                  placeholder="Buscar por nome, tipo, cliente ou número de série"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Serial Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  Data Entrada
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
              {equipamentosFiltrados.length > 0 ? (
                equipamentosFiltrados.map((cadastro, index) => (
                  <tr
                    key={cadastro.idEquipamento}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cadastro.idEquipamento}
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
                      {cadastro.Marca || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cadastro.clienteNome || cadastro.cliente || 'Desconhecido'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cadastro.SerialNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(cadastro.DataEntrada), "dd'/'MM'/'yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          className="cursor-pointer text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          onClick={() => handleEdit(cadastro)}
                        >
                          <IoCreateOutline className="h-5 w-5" />
                        </button>

                        <button
                          className="cursor-pointer text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          onClick={() =>
                            handleDelete(cadastro.idEquipamento)
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
                    Nenhum equipamento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginação (opcional) */}
      {equipamentosFiltrados.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{equipamentosFiltrados.length}</span> de {""}
                
                <span className="font-medium">
                  {equipamentos.length}
                </span>
                
                {""} resultados
              </p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}