import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoCheckmark } from "react-icons/io5";
import { format, compareAsc } from 'date-fns';

// Importe seus componentes personalizados
import InputForm from "../InputForm/InputForm";
import TextAreaForm from "../TextAreaForm/TextAreaForm";
import SelectForm from "../SelectForm/SelectForm";
import DataForm from "../DataForm/DataForm";
import SelectEquipamentos from "../SelectEquipamentos/SelectEquipamentos";
import SelectFuncionarios from "../SelectFuncionarios/SelectFuncionarios";

const FormCadastroManutencao = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    equipamento: "",
    dataEntrada: "",
    dataPrazo: "",
    responsavel: "",
    status: "",
    descricao: "",
    observacoes: "",
  });


  const [equipamentos, setEquipamentos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isEditing = !!id;


  function formatDateForInput(dateString) {
    if (!dateString) return '';

    // Se já estiver no formato YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // Se for uma string ISO (com timezone)
    if (dateString.includes('T')) {
      return dateString.split('T')[0];
    }

    // Se for um objeto Date ou timestamp
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    return '';
  }

  // Carrega equipamentos
  useEffect(() => {
    const getEquipamentos = async () => {
      try {
        const res = await axios.get("https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/equipamento");
        console.log(res.data)
        setEquipamentos(
          res.data.equipamentos.sort((a, b) => (a.Nome > b.Nome ? 1 : -1))
        );
        setIsLoading(false);
      } catch (error) {
        Swal.fire("Erro", error.message);
        setIsLoading(false);
      }
    };

    getEquipamentos();
  }, []);

  useEffect(() => {
    const getFuncionarios = async () => {
      try {
        const response = await axios.get("https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/funcionario")
        setFuncionarios(response.data.funcionarios.sort((a, b) => (a.Nome > b.Nome ? 1 : -1)))
      }
      catch (error) {
        Swal.fire("Erro", error.message);
        setIsLoading(false);
      }
    }

    getFuncionarios()
  }, [])

  useEffect(() => {
    if (!isLoading && isEditing && state?.manutencoes) {
      const manutencao = state.manutencoes;
      console.log('Equipamento recebido:', manutencao);

      setFormData({
        equipamento: manutencao.Equipamento_idEquipamento?.toString() || '',
        dataEntrada: formatDateForInput(manutencao.DataEntrada) || '',
        dataPrazo: formatDateForInput(manutencao.DataSaida) || '',
        responsavel: manutencao.ResponsavelManutencao,
        status: manutencao.Status,
        descricao: manutencao.Descricao,
        observacoes: manutencao.Observacoes,
      });

      console.log(formData.dataPrazo)
    }
  }, [isLoading, isEditing, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.equipamento) {
      Swal.fire("Atenção", "Informe o equipamento!", "warning");
      return;
    }

    if(!formData.equipamento || !formData.dataEntrada || !formData.dataPrazo || !formData.responsavel || !formData.status){
      Swal.fire("Atenção", "Campo(s) obrigatório(s) vazios!", "warning");
      return
    }
    
     if(compareAsc(new Date(formData.dataPrazo), new Date(formData.dataEntrada)) == -1){
      Swal.fire('Atenção', ' A data de prazo  não pode ser anterior à data de entrada!', 'warning');
      return
    }


   
    try {
      const payload = {
        equipamento_id: +formData.equipamento,
        dataentrada: formData.dataEntrada,
        dataprazo: formData.dataPrazo,
        responsavel: formData.responsavel,
        status: formData.status,
        Observacoes: formData.observacoes,
        Descricao: formData.descricao,
      };
      console.log(payload);
      if (isEditing) {
        console.log("aqui")
        payload.idEquipamento = id;

        await axios.put(
          `https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/cadastromanutencao/${id}`,
          payload
        );
        Swal.fire("Sucesso", "Registro atualizado com sucesso", "success");
      } else {
        console.log(payload);
        await axios.post("https://api-fixwise-awa3cbckgmebe6bm.centralus-01.azurewebsites.net/cadastromanutencao", payload);

        Swal.fire("Sucesso", "Registro incluído com sucesso", "success");
      }

      navigate("/manutencoes");
    } catch (error) {
      Swal.fire(
        "Erro",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  function formatDateForInput(dateString) {
    if (!dateString) return "";

    // Se já estiver no formato YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // Se for uma string ISO (com timezone)
    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }

    // Se for um objeto Date ou timestamp
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    return "";
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow overflow-hidden rounded-lg p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna 1 */}
        <div className="space-y-4">
          <div className="col-span-2 mb-4">
            <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">
              Informações básicas
            </h2>
          </div>

          <div>
            <label
              htmlFor="equipamentos"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Equipamento *
            </label>
            <SelectEquipamentos
              name="equipamento"
              titulo="equipamento"
              options={equipamentos}
              value={formData.equipamento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="entrada"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data Entrada *
            </label>
            <DataForm
              name="dataEntrada"
              content="Data Entrada"
              value={formData.dataEntrada}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="dataPrazo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data Prazo *
            </label>
            <DataForm
              name="dataPrazo"
              content="Data Prazo"
              value={formData.dataPrazo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="space-y-4">
          <div className="col-span-2 mb-4">
            <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">
              Detalhes Técnicos
            </h2>
          </div>

          <div>
            <label
              htmlFor="responsavel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Responsável *
            </label>
            <SelectFuncionarios
              name="responsavel"
              titulo="responsavel"
              options={funcionarios}
              value={formData.responsavel}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="serial"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              onChange={handleChange}
            >
              <option value="">Selecione um status</option>
              <option value="Pendente">Pendente</option>
              <option value="Iniciada">Iniciada</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descrição
          </label>
          <TextAreaForm
            name="descricao"
            content="Descrição"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="observacoes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Observações
          </label>
          <TextAreaForm
            name="observacoes"
            content="Observações"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <Link to={"/manutencoes"}>
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
          Salvar Manutenção
        </button>
      </div>
    </form>
  );
};

export default FormCadastroManutencao;
