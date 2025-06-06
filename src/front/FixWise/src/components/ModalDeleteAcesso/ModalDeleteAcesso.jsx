import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalDeleteAcesso = ({ onClose, idUser, setAcessos, acessos}) => {
  const handleSubmit = async (idUser) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/acessos/${idUser}`
      );
      setAcessos(acessos.filter((acesso) => acesso.idAcesso !== idUser))
      onClose();
      await Swal.fire({
      title: "Sucesso!",
      text: "Acesso deletado com sucesso!",
      icon: "success", // corrigido
      confirmButtonText: "OK",
    });
      
       
    } catch (error) {
      console.log("Erro ao deletar o usuário:" + error);
    }
  };

  return (
    <div className="">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
          <div>
            <h1>Deseja mesmo deletar esse cliente?</h1>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="w-20 ring p-1 rounded hover:cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => handleSubmit(idUser)}
              className="w-20 p-1 bg-red-700 text-white rounded hover:cursor-pointer"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAcesso;
