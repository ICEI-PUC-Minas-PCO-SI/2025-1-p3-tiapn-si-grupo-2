import React from "react";
import { useState } from "react";

const ModalEditCliente = ({ onClose, idUser }) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cidade, setCidade] = useState("");

  const handleSubmit = (idUser) => {
    fetch(`http://localhost:3000/clientes/${idUser}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade, cidade }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error("Erro ao atualizar cliente:", err);
      })
      .finally(() => {
        onClose();
        window.location.reload();
      });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
        <form action="" className="flex flex-col gap-2">
          <label>Nome</label>
          <input
            placeholder="Nome"
            className="ring px-2 py-1 rounded"
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Idade</label>
          <input
            placeholder="Idade"
            className="ring px-2 py-1 rounded"
            onChange={(e) => setIdade(e.target.value)}
          />
          <label>Cidade</label>
          <input
            placeholder="Cidade"
            className="ring px-2 py-1 rounded"
            onChange={(e) => setCidade(e.target.value)}
          />
        </form>
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="w-20 ring p-1 rounded">
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit(idUser)}
            className="w-20 p-1 bg-gray-900 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditCliente;
