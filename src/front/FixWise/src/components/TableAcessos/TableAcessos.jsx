import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CiEdit, CiTrash } from "react-icons/ci";
import ModalDeleteAcesso from "../ModalDeleteAcesso/ModalDeleteAcesso";
import ModalEditAcesso from "../ModalEditAcesso/ModalEditAcesso";

const TableAcessos = () => {
  const [acessos, setAcessos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    const fetchAcessos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/acessos");
        setAcessos(response.data);
      } catch (error) {
        console.error("Erro ao buscar acessos:", error);
      }
    };

    fetchAcessos();
  }, []);

  const toggleModalEdit = (id) =>{
    setIdUser(id);
    setModalEditIsOpen(!modalEditIsOpen)
  }

  const toggleModalRemove = (id) =>{
    setIdUser(id);
    setModalRemoveIsOpen(!modalRemoveIsOpen)
  }

  const acessosFiltrados = acessos.filter((cadastro) =>
    `${cadastro.Nome} ${cadastro.CPF} ${cadastro.Matricula}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-20 overflow-x-auto rounded-md px-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome, CPF ou matrícula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
        />
        <Link to={"/cadastro-acessos"}><button className="p-2 bg-black text-white rounded-md hover:cursor-pointer">Cadastrar</button></Link>
      </div>

      <table className="w-full rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="p-4">ID</th>
            <th className="p-4">CPF</th>
            <th className="p-4">Nome</th>
            <th className="p-4">Matrícula</th>
            <th className="p-4">Nível de Acesso</th>
            <th className="p-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {acessosFiltrados.map((cadastro, index) => (
            <tr
              key={cadastro.idAcesso}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-4">{cadastro.idAcesso}</td>
              <td className="p-4">{cadastro.CPF}</td>
              <td className="p-4">{cadastro.Nome}</td>
              <td className="p-4">{cadastro.Matricula}</td>
              <td className="p-4">{cadastro.NivelAcesso}</td>
              <td className="p-4">
                <div className="flex gap-3 text-xl text-gray-600">
                  <button title="Editar">
                    <CiEdit className="hover:cursor-pointer text-2xl" onClick={() => toggleModalEdit(cadastro.idAcesso)} />
                  </button>
                  <button title="Excluir">
                    <CiTrash className="hover:cursor-pointer text-red-600 text-2xl" onClick={() => toggleModalRemove(cadastro.idAcesso)} />
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
      {modalEditIsOpen && <ModalEditAcesso onClose={toggleModalEdit} idUser={idUser} setAcessos={setAcessos} />}
      {modalRemoveIsOpen && <ModalDeleteAcesso onClose={toggleModalRemove} idUser={idUser} setAcessos={setAcessos} acessos={acessos} />}
      
      
    </div>
  );
};

export default TableAcessos;
