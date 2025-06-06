import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import InputCpfCnpj from "../InputCpfCnpj/InputCpfCnpj";
import TextAreaForm from "../TextAreaForm/TextAreaForm";
import BotaoCancelar from "../BotaoCancelar/BotaoCancelar";
import BotaoSalvar from "../BotaoSalvar/BotaoSalvar";
import { Link, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const queryClient = new QueryClient();

const FormCadastroCliente = () => {
  const navigate = useNavigate();
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
  };

  const updateFormWithCnpjData = (data) => {
    const estabelecimento = data.estabelecimento;
    console.log(data.estabelecimento);
    setFormData((prev) => ({
      ...prev,
      nome: data.razao_social || prev.nome,
      uf: estabelecimento?.estado?.sigla || prev.uf,
      cidade: estabelecimento?.cidade?.nome || prev.cidade,
      bairro: estabelecimento?.bairro || prev.bairro,
      numero: estabelecimento?.numero || prev.numero,
      complemento: estabelecimento?.complemento || prev.complemento,
      email: estabelecimento?.email || prev.email,
      logradouro: estabelecimento?.logradouro || prev.logradouro,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.cpfCnpj.trim().length > 0 ||
        formData.nome.trim().length > 0
      ) {
        const response = await axios.post(
          "http://localhost:3000/clientes",
          formData
        );
        await Swal.fire({
          title: "Sucesso!",
          text: "Cliente cadastrado com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(-1);
      } else {
        Swal.fire({
          title: "Erro!",
          text: "CPF/CPNJ OU NOME NÃO PODEM SER VAZIOS!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <form
          action=""
          className="py-4 flex flex-col gap-5"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            <InputCpfCnpj
              value={formData.cpfCnpj}
              onChange={(value) => handleInputChange("cpfCnpj", value)}
              onCnpjData={updateFormWithCnpjData}
              content="CPF/CNPJ"
            />
            <InputForm
              content="Nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
            />
            <InputForm
              content="UF"
              value={formData.uf}
              onChange={(e) => handleInputChange("uf", e.target.value)}
            />
            <InputForm
              content="Cidade"
              value={formData.cidade}
              onChange={(e) => handleInputChange("cidade", e.target.value)}
            />
            <InputForm
              content="Bairro"
              value={formData.bairro}
              onChange={(e) => handleInputChange("bairro", e.target.value)}
            />
            <InputForm
              content="Logradouro"
              value={formData.logradouro}
              onChange={(e) => handleInputChange("logradouro", e.target.value)}
            />
            <InputForm
              content="Número"
              value={formData.numero}
              onChange={(e) => handleInputChange("numero", e.target.value)}
            />
            <InputForm
              content="Complemento"
              value={formData.complemento}
              onChange={(e) => handleInputChange("complemento", e.target.value)}
            />
            <InputForm
              content="E-mail"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-5">
            <TextAreaForm
              content="Descrição"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
            />
            <TextAreaForm
              content="Observações"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
            />
          </div>
          <div className="flex gap-5 mt-5">
            <Link to="/clientes">
              <BotaoCancelar />
            </Link>
            <BotaoSalvar />
          </div>
        </form>
      </div>
    </QueryClientProvider>
  );
};

export default FormCadastroCliente;
