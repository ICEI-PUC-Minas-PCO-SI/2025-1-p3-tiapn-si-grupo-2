import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CiEdit, CiTrash } from "react-icons/ci";
import Swal from 'sweetalert2'
import ModalEquipamento from "../ModalEquipamento/ModalEquipamento";

export default function TableEquipamentos({onEdit, setOnEdit}) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [idUser, setIdUser] = useState(null);

    const getEquipamentos = async () => {
      try {
        const res = await axios.get("http://localhost:8080/equipamento");
        setEquipamentos(res.data);
      } catch (error) {
        console.error("Erro ao buscar equipamentos:", error);
      }
    };

  useEffect(() => {
    getEquipamentos();
  }, [setEquipamentos]);

  const toggleModalEdit = (equip) =>{
    console.log(equip);
    setOnEdit(equip);

    setIdUser(equip.idEquipamento);
    setModalEditIsOpen(!modalEditIsOpen)
  }

  const toggleModalRemove = async (id) =>{
    await axios.delete(`http://localhost:8080/equipamento/${id}`).then(({ data }) => {
        const newArray = equipamentos.filter((equip) => equip.idEquipamento !== id)
        setEquipamentos(newArray);
        // setClientes(newArray);
        Swal.fire('Sucesso', 'Equipamento excluído!', 'success')
        // toast.success('Cliente deletado com sucesso');
    }).catch(({ data }) => Swal.fire('Erro ao excluir', data.message));
  }

  const acessosFiltrados = equipamentos.filter((cadastro) =>
    `${cadastro.Nome} ${cadastro.Tipo} ${cadastro.Marca}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-20 overflow-x-auto rounded-md px-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome, tipo ou marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
        />
        <Link to={"/cadastro-equipamentos"}>
            <button className="p-2 bg-black text-white rounded-md hover:cursor-pointer">Cadastrar</button>
        </Link>
      </div>

      <table className="w-full rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="p-4">ID</th>
            <th className="p-4">Nome</th>
            <th className="p-4">Tipo</th>
            <th className="p-4">Marca</th>
            <th className="p-4">Cliente</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((cadastro, index) => (
            <tr
              key={cadastro.idEquipamento}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-4">{cadastro.idEquipamento}</td>
              <td className="p-4">{cadastro.Nome}</td>
              <td className="p-4">{cadastro.Tipo}</td>
              <td className="p-4">{cadastro.Marca}</td>
              <td className="p-4">{cadastro.cliente.Nome}</td>
              <td className="p-4">
                <div className="flex gap-3 text-xl text-gray-600">
                  <button title="Editar">
                    <CiEdit className="hover:cursor-pointer text-2xl" onClick={() => toggleModalEdit(cadastro)} />
                  </button>
                  <button title="Excluir">
                    <CiTrash className="hover:cursor-pointer text-red-600 text-2xl" onClick={() => toggleModalRemove(cadastro.idEquipamento)} />
                  </button>
                </div>
              </td>
              
            </tr>
            
          ))}

          {acessosFiltrados.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-6 text-gray-500">
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalEditIsOpen && <ModalEquipamento onEdit={onEdit} setOnEdit={setOnEdit} getEquipamentos={getEquipamentos} onClose={toggleModalEdit}  />}     
    </div>
  );
};