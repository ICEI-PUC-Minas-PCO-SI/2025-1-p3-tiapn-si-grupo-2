import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { CiEdit, CiTrash } from "react-icons/ci";
import ModalDeleteAcesso from "../ModalDeleteCliente/ModalDeleteCliente";
import ModalEditAcesso from "../ModalEditCliente/ModalEditCliente";

const TableEquipamentosExternos = () => {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalRemoveIsOpen, setModalRemoveIsOpen] = useState(false);
  const [idCliente, setIdCliente] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const toggleModalEdit = (id) => {
    setIdCliente(id);
    setModalEditIsOpen(!modalEditIsOpen);
  };

  const toggleModalRemove = (id) => {
    setIdCliente(id);
    setModalRemoveIsOpen(!modalRemoveIsOpen);
  };

  const clientesFiltrados = clientes.filter((cadastro) =>
    `${cadastro.Nome} ${cadastro.CPF_CNPJ}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-20 overflow-x-auto rounded-md px-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome ou CPF/CPNJ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
        />
        <Link to={"/cadastro-equipamentos"}>
          <button className="p-2 bg-black text-white rounded-md hover:cursor-pointer">
            Cadastrar
          </button>
        </Link>
      </div>

      <table className="w-full rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-900 text-white text-left text-sm uppercase">
            <th className="p-4">ID</th>
            <th className="p-4">CPF/CPNJ</th>
            <th className="p-4">Nome</th>
            <th className="p-4">E-mail</th>
            <th className="p-4">UF</th>
            <th className="p-4">Cidade</th>
            <th className="p-4">Bairro</th>
            <th className="p-4">Logradouro</th>
            <th className="p-4">Número</th>
            <th className="p-4">Complemento</th>
            <th className="p-4">Ação</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cadastro, index) => (
            <tr
              key={cadastro.idCliente}
              className={index % 2 === 0 ? "bg-white" : "bg-[#edeeec]"}
            >
              <td className="p-4">{cadastro.idCliente}</td>
              <td className="p-4">{cadastro.CPF_CNPJ}</td>
              <td className="p-4">{cadastro.Nome}</td>
              <td className="p-4">{cadastro.EmailContato}</td>
              <td className="p-4">{cadastro.UF}</td>
              <td className="p-4">{cadastro.Cidade}</td>
              <td className="p-4">{cadastro.Bairro}</td>
              <td className="p-4">{cadastro.Logradouro}</td>
              <td className="p-4">{cadastro.Numero}</td>
              <td className="p-4">{cadastro.Complemento}</td>
              <td className="p-4">
                <div className="flex gap-3 text-xl text-gray-600">
                  <button title="Editar">
                    <CiEdit
                      className="hover:cursor-pointer text-2xl"
                      onClick={() => toggleModalEdit(cadastro.idCliente)}
                      clientes={clientes}
                      setClientes={setClientes}
                    />
                  </button>
                  <button title="Excluir">
                    <CiTrash
                      className="hover:cursor-pointer text-red-600 text-2xl"
                      onClick={() => toggleModalRemove(cadastro.idCliente)}
                      
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {clientesFiltrados.length === 0 && (
            <tr>
              <td colSpan="12" className="text-center p-6 text-gray-500">
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalEditIsOpen && (
        <ModalEditAcesso
          onClose={toggleModalEdit}
          idUser={idCliente}
          setClientes={setClientes}
          clientes={clientes}
        />
      )}
      {modalRemoveIsOpen && (
        <ModalDeleteAcesso
          onClose={toggleModalRemove}
          idUser={idCliente}
          setClientes={setClientes}
          clientes={clientes}
        />
      )}
    </div>
  );
};

export default TableEquipamentosExternos;
