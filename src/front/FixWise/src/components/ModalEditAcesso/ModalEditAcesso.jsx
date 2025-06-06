import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ModalEditAcesso = ({ onClose, idUser }) => {
  const listNivelAcesso = ["Gerente", "Funcionário"];
  const [userData, setUserData] = useState(null);
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [senha, setSenha] = useState(null);

  const handleSubmit = async () => {
    const dataToSend = {
      cpf,
      nome,
      matricula,
      nivelAcesso,
      senha
    };
    try {
      const response = await axios.put(
        `http://localhost:3000/acessos/${idUser}`,
        dataToSend
      );
      await Swal.fire({
        title: "Sucesso!",
        text: "Acesso alterado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Erro!",
        text: "Algo deu errado!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const getUserDados = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/acessos/${idUser}`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setUserData(data);
          setCpf(data[0].CPF);
          setNome(data[0].Nome);
          setMatricula(data[0].Matricula);
          setNivelAcesso(data[0].NivelAcesso);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    getUserDados();
  }, []);

  const handleCPF = (e) => {
    let value = e.target.value;
    // Remove tudo que não for número
    value = value.replace(/\D/g, "");
    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);
    // Aplica a máscara progressivamente
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    setCpf(value);
    console.log(value);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
        <form action="" className="flex flex-col gap-2">
          <label>CPF</label>
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            maxLength={14}
            onChange={(e) => handleCPF(e)}
            className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
          />
          <label>NOME</label>
          <input
            type="text"
            placeholder="NOME"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
          />
          <label>MATRÍCULA</label>
          <input
            type="text"
            placeholder="MATRÍCULA"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
          />
          <label>NÍVEL DE ACESSO</label>
          <select
            className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
            value={nivelAcesso}
            onChange={(e) => setNivelAcesso(e.target.value)}
          >
            {listNivelAcesso.map((nivel) => (
              <option>{nivel}</option>
            ))}
          </select>
          <label>NOVA SENHA</label>
          <input
            type="text"
            placeholder="NOVA SENHA"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded-md w-full max-w-md shadow-sm"
          />
        </form>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="w-20 ring p-1 rounded hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="w-20 p-1 bg-gray-900 text-white rounded hover:cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAcesso;
