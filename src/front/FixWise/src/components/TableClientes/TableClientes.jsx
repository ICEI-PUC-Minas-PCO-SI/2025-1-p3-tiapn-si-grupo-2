import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import ModalEditCliente from "../ModalEditCliente/ModalEditCliente";
import ModalDeleteCliente from "../ModalDeleteCliente/ModalDeleteCliente";

const TableClientes = () => {
  const [users, setUsers] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isRemovible, setIsRemovible] = useState(false)
  const [idUser, setIdUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/clientes")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []); // <- Corrigido aqui: só executa uma vez

  const toggleModalEdit = (id) => {
    setIdUser(id);
    setIsEditable(!isEditable);
  };

  const toggleModalDelete = (id) =>{
    setIdUser(id)
    setIsRemovible(!isRemovible)
  }


  return (
    <div className="w-9/10 relative">
      <Table className="h-auto shadow-md">
        <TableHead >
          <TableRow className="bg-gray-500 w-full">
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>NOME</TableHeadCell>
            <TableHeadCell>IDADE</TableHeadCell>
            <TableHeadCell>CIDADE</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Remove</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {users.map((user) => (
            <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.id}
              </TableCell>
              <TableCell>{user.nome}</TableCell>
              <TableCell>{user.idade}</TableCell>
              <TableCell>{user.cidade}</TableCell>
              <TableCell>
                <button onClick={() => toggleModalEdit(user.id)}>Editar</button>
              </TableCell>
              <TableCell>
                <button onClick={() => toggleModalDelete(user.id)}>Deletar</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isEditable && <ModalEditCliente onClose={toggleModalEdit} idUser={idUser} />}
      {isRemovible && <ModalDeleteCliente onClose={toggleModalDelete} idUser={idUser} />}
    </div>
  );
};

export default TableClientes;
