import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCheckmark } from "react-icons/io5";
import InputCpfCnpj from "../InputCpfCnpj/InputCpfCnpj";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InputForm from "../InputForm/InputForm";
import TextAreaForm from "../TextAreaForm/TextAreaForm";


const FormCadastroCliente = () => {
  const queryClient = new QueryClient();
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [rawValue, setRawValue] = useState("");
  const [rawTelefone, setRawTelefone] = useState("");
  const digits = rawValue.replace(/\D/g, "");

  const masksCpfCnpj = [
    {
      mask: "000.000.000-00",
    },
    {
      mask: "00.000.000/0000-00",
    },
  ];

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
      email: estabelecimento?.email || prev.email,
      logradouro: estabelecimento?.logradouro || prev.logradouro,
      cep: estabelecimento?.cep || prev.cep,
      telefone:
        `(${estabelecimento?.ddd1})${" "}${estabelecimento?.telefone1}` ||
        prev.telefone,
    }));
  };

  const masksTelefone = [
    { mask: "(00) 0000-0000" },
    { mask: "(00) 00000-0000" },
  ];

  const [formData, setFormData] = useState({
    nome: "",
    cpfCnpj: "",
    email: "",
    telefone: "",
    logradouro: "",
    cep: "",
    cidade: "",
    bairro: "",
    numero: "",
    uf: "",
    descricao: "",
    observacoes: "",
  });

  const isEditing = !!id;

  // Preenche formulário quando editar
  useEffect(() => {
    if (isEditing && state?.cliente) {
      const cliente = state.cliente;

      setFormData({
        nome: cliente.Nome || "",
        cpfCnpj: cliente.CPF_CNPJ || "",
        email: cliente.EmailContato || "",
        telefone: cliente.TelefoneContato || "",
        logradouro: cliente.Logradouro || "",
        cep: cliente.CEP || "",
        cidade: cliente.Cidade || "",
        bairro: cliente.Bairro || "",
        numero: cliente.Numero || "",
        uf: cliente.UF || "",
        descricao: cliente.Descricao || "",
        observacoes: cliente.Observacoes || "",
      });
    }
  }, [isEditing, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome) {
      Swal.fire("Atenção", "Informe o nome!", "warning");
      return;
    }

     if (!formData.nome || !formData.cpfCnpj || !formData.logradouro || !formData.cep || !formData.cidade || !formData.bairro || !formData.numero || !formData.uf) {
      Swal.fire("Atenção", "Campo(s) obrigatorio(s) vazio(s)!", "warning");
      return;
    }

    if (!formData.cpfCnpj) {
      Swal.fire("Atenção", "Informe o cpf ou o cnpj!", "warning");
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        cpf_cnpj: formData.cpfCnpj,
        email: formData.email,
        telefone: formData.telefone,
        logradouro: formData.logradouro,
        cep: formData.cep,
        cidade: formData.cidade,
        bairro: formData.bairro,
        numero: formData.numero,
        uf: formData.uf,
        descricao: formData.descricao,
        observacoes: formData.observacoes,
      };

      if (isEditing) {
        await axios.put(`https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/cliente/${id}`, payload);
        Swal.fire("Sucesso", "Registro atualizado com sucesso", "success");
      } else {
        await axios.post("https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/cliente", payload);
        Swal.fire("Sucesso", "Registro incluído com sucesso", "success");
      }

      navigate("/clientes");
    } catch (error) {
      Swal.fire(
        "Erro",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow overflow-hidden rounded-lg p-6"
        >
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Informações do Cliente
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cpfCnpj"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CPF / CNPJ *
                  </label>
                  <InputCpfCnpj
                    value={formData.cpfCnpj}
                    onChange={handleChange}
                    onCnpjData={updateFormWithCnpjData}
                    content="CPF/CNPJ"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Telefone 
                  </label>
                  <InputForm
                    name="telefone"
                    content="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nome *
                  </label>
                  <InputForm
                    name="nome"
                    content="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-mail
                  </label>
                  <InputForm
                    name="email"
                    content="E-mail"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Endereço
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CEP *
                  </label>
                  <InputForm
                    name="cep"
                    content="CEP"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Número *
                  </label>
                  <InputForm
                    name="numero"
                    content="Número"
                    value={formData.numero}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bairro *
                  </label>
                  <InputForm
                    name="cidade"
                    content="Bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Logradouro *
                  </label>
                  <InputForm
                    name="logradouro"
                    content="Logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cidade *
                  </label>
                  <InputForm
                    name="cidade"
                    content="Cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="uf"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    UF *
                  </label>
                  <select
                    value={formData.uf}
                    onChange={handleChange}
                    name="uf"
                    id="uf"
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">-- Selecione --</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espirito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <TextAreaForm
              content="Descrição"
              value={formData.descricao}
              onChange={handleChange}
            />
            <TextAreaForm
              content="Observações"
              value={formData.observacoes}
              onChange={handleChange}
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Link to={"/clientes"}>
              <button
                type="button"
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
            </Link>

            <button
              type="submit"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <IoCheckmark className="-ml-1 mr-2 h-5 w-5" />
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </QueryClientProvider>
  );
};

export default FormCadastroCliente;
