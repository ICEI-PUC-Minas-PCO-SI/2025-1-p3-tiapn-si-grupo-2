import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import Swal from 'sweetalert2'
import ModalEquipamento from "../ModalEquipamento/ModalEquipamento";
import { IoTrashOutline, IoCreateOutline } from "react-icons/io5";

export default function TableEquipamentos({ onEdit, setOnEdit }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [idUser, setIdUser] = useState(null);

  const getEquipamentos = async () => {
    try {
      const res = await axios.get("http://localhost:3010/equipamento");
      setEquipamentos(res.data.equipamento);

    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    }
  };

  useEffect(() => {
    getEquipamentos();
  }, [setEquipamentos]);

  const toggleModalEdit = (equip) => {
    console.log(equip);
    setOnEdit(equip);

    setIdUser(equip.idEquipamento);
    setModalEditIsOpen(!modalEditIsOpen)
  }

  const toggleModalRemove = async (id) => {
    await axios.delete(`http://localhost:3010/equipamento/${id}`).then(({ data }) => {
      const newArray = equipamentos.filter((equip) => equip.idEquipamento !== id)
      setEquipamentos(newArray);
      // setClientes(newArray);
      Swal.fire('Sucesso', 'Equipamento excluído!', 'success')
      // toast.success('Cliente deletado com sucesso');
    }).catch(({ data }) => Swal.fire('Erro ao excluir', data.message));
  }

  console.log(equipamentos)

  const equipamentosFiltrados = equipamentos.filter((cadastro) =>
    `${cadastro.Nome} ${cadastro.Tipo} ${cadastro.Marca}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* <div className="flex w-full justify-between sm:w-auto mb-2">
        <input
          type="text"
          placeholder="Buscar por nome, tipo ou marca..."
          className="input input-bordered"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
   
        <Link to={"/cadastro-equipamentos"}>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 cursor-pointer transition">
                <IoAddOutline size={20} />
                Cadastrar
            </button>
        </Link>
      </div> */}

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Marca</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                equipamentos.map(
                  (cadastro, index) => (
                    <tr key={cadastro.idEquipamento} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cadastro.idEquipamento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cadastro.Nome}</div>
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
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50">
                            <IoCreateOutline className="h-5 w-5"/>
                          </button>

                          <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50">
                            <IoTrashOutline className="h-5 w-5"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              }
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
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
                  <span className="font-medium">{equipamentosFiltrados.length}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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

      {modalEditIsOpen && <ModalEquipamento onEdit={onEdit} setOnEdit={setOnEdit} getEquipamentos={getEquipamentos} onClose={toggleModalEdit} />}
    </>

  );
};