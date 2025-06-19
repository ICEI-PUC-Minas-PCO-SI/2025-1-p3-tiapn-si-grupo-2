import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const ModalDeleteCliente = ({ onClose, idUser, setClientes, clientes }) => {
  const handleSubmit = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${userId}`);
      await Swal.fire({
        title: "Sucesso!",
        text: "Cliente deletado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      
      setClientes(clientes.filter((cliente) => cliente.idCliente !== idUser));
      onClose();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      await Swal.fire({
        title: "Erro!",
        text: "Não foi possível deletar o cliente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
        <div>
          <h1>Deseja mesmo deletar esse cliente?</h1>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="w-20 ring p-1 rounded cursor-pointer">
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit(idUser)}
            className="w-20 p-1 bg-red-700 text-white rounded cursor-pointer"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteCliente;
