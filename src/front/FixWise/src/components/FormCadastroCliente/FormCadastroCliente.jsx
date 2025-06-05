import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import InputCpfCnpj from "../InputCpfCnpj/InputCpfCnpj";
import TextAreaForm from "../TextAreaForm/TextAreaForm";
import BotaoCancelar from "../BotaoCancelar/BotaoCancelar";
import BotaoSalvar from "../BotaoSalvar/BotaoSalvar";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const FormCadastroCliente = () => {
  const [formData, setFormData] = useState({
    cpfCnpj: "",
    nome: "",
    uf: "",
    cidade: "",
    bairro: "",
    numero: "",
    complemento: "",
    descricao: "",
    observacoes: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFormWithCnpjData = (data) => {
    const estabelecimento = data.estabelecimento;
    setFormData((prev) => ({
      ...prev,
      nome: data.razao_social || prev.nome,
      uf: estabelecimento?.estado?.sigla || prev.uf,
      cidade: estabelecimento?.cidade?.nome || prev.cidade,
      bairro: estabelecimento?.bairro || prev.bairro,
      numero: estabelecimento?.numero || prev.numero,
      complemento: estabelecimento?.complemento || prev.complemento,
    }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <form action="" className="py-4 flex flex-col gap-5">
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
              content="Número"
              value={formData.numero}
              onChange={(e) => handleInputChange("numero", e.target.value)}
            />
            <InputForm
              content="Complemento"
              value={formData.complemento}
              onChange={(e) => handleInputChange("complemento", e.target.value)}
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
            <Link to="/">
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
