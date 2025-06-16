import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ModalEditCliente = ({ onClose, idUser, setClientes, clientes }) => {
  const [dadosCliente, setDadosCliente] = useState(null);
  const [formData, setFormData] = useState({
    cpfCnpj: "",
    nome: "",
    uf: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
    email: "",
    descricao: "",
    observacoes: "",
    cep: "",
    telefone: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(value);
  };

  const handleSubmit = async (idUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/clientes/${idUser}`,
        formData
      );
      console.log("Cliente atualizado:", response.data);
      await Swal.fire({
        title: "Sucesso!",
        text: "Cliente atualizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      onClose();
      setClientes((prevClientes) =>
        prevClientes.map((cliente) =>
          cliente.idCliente === idUser ? { ...cliente, ...formData } : cliente
        )
      );
      window.location.reload()
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  };

  useEffect(() => {
    const getClienteDados = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/clientes/${idUser}`
        );
        const data = response.data;

        const cliente = Array.isArray(data) ? data[0] : data;

        setDadosCliente(cliente);
        console.log(cliente);
        setFormData({
          cpfCnpj: cliente.CPF_CNPJ || "",
          nome: cliente.Nome || "",
          uf: cliente.UF || "",
          cidade: cliente.Cidade || "",
          bairro: cliente.Bairro || "",
          logradouro: cliente.Logradouro || "",
          numero: cliente.Numero || "",
          complemento: cliente.Complemento || "",
          email: cliente.EmailContato || "",
          descricao: cliente.Descricao || "",
          observacoes: cliente.Observacoes || "",
          cep: cliente.CEP || "",
          telefone: cliente.TelefoneContato || "",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    getClienteDados();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
        <form action="" className="flex flex-col gap-2">
          <label>CPF/CNPJ</label>
          <input
            placeholder="CPF/CNPJ"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
            value={formData.cpfCnpj}
          />
          <label>Nome</label>
          <input
            placeholder="Nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("nome", e.target.value)}
            value={formData.nome}
          />
          <label>UF</label>
          <input
            placeholder="Cidade"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("uf", e.target.value)}
            value={formData.uf}
          />
          <label>Bairro</label>
          <input
            placeholder="Bairro"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("bairro", e.target.value)}
            value={formData.bairro}
          />
          <label>Logradouro</label>
          <input
            placeholder="Logradouro"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("logradouro", e.target.value)}
            value={formData.logradouro}
          />
          <label>Número</label>
          <input
            placeholder="Número"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("numero", e.target.value)}
            value={formData.numero}
          />
          <label>Complemento</label>
          <input
            placeholder="Complemento"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("complemento", e.target.value)}
            value={formData.complemento}
          />
          <label>E-mail</label>
          <input
            placeholder="E-mail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleInputChange("email", e.target.value)}
            value={formData.email}
          />
        </form>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="w-20 ring p-1 rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit(idUser)}
            className="w-20 p-1 bg-gray-900 text-white rounded cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditCliente;
