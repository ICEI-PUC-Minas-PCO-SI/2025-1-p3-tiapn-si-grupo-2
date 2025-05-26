import React from "react";

const ModalDeleteCliente = ({ onClose, idUser }) => {
  const handleSubmit = (userId) => {
    fetch(`http://localhost:3000/clientes/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
        console.log(userId);
        window.location.reload();
      });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
        <div>
          <h1>Deseja mesmo deletar esse cliente?</h1>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="w-20 ring p-1 rounded">
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit(idUser)}
            className="w-20 p-1 bg-red-700 text-white rounded"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteCliente;
