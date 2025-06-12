import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IoCheckmark } from 'react-icons/io5'

// Importe seus componentes personalizados
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import SelectForm from '../SelectForm/SelectForm'
import SelectCliente from '../Select/SelectCliente'
import DataForm from '../DataForm/DataForm'

const FormCadastroEquipamentos = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cliente: '',
    nome: '',
    Tipo: '',
    marca: '',
    serial: '',
    entrada: '',
    saida: '',
    observacoes: ''
  });

  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isEditing = !!id;

  // Carrega clientes
  useEffect(() => {
    const getClientes = async () => {
      try {
        const res = await axios.get("http://localhost:3010/cliente");
        setClientes(res.data.clientes.sort((a, b) => (a.Nome > b.Nome ? 1 : -1)));
        setIsLoading(false);
      } catch (error) {
        Swal.fire('Erro', error.message);
        setIsLoading(false);
      }
    };

    getClientes();
  }, []);

  // Preenche formulário quando editar
  useEffect(() => {
    if (!isLoading && isEditing && state?.equipamento) {
      const equipamento = state.equipamento;
      console.log('Equipamento recebido:', equipamento);

      setFormData({
        cliente: equipamento.Cliente_idCliente?.toString() || '',
        nome: equipamento.Nome || '',
        Tipo: equipamento.Tipo || '',
        marca: equipamento.Marca || '',
        serial: equipamento.SerialNumber || '',
        entrada: formatDateForInput(equipamento.DataEntrada) || '',
        saida: formatDateForInput(equipamento.DataSaida) || '',
        descricao: equipamento.Descricao || '',
        observacoes: equipamento.Observacoes || ''
      });
    }
  }, [isLoading, isEditing, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cliente) {
      Swal.fire('Atenção', 'Informe o cliente!', 'warning');
      return;
    }

    try {
      const payload = {
        Cliente_idCliente: +formData.cliente,
        Nome: formData.nome,
        Tipo: formData.Tipo,
        Marca: formData.marca,
        SerialNumber: formData.serial,
        DataEntrada: formData.entrada ? formatDateForInput(formData.entrada) : null,
        DataSaida: formData.saida ? formatDateForInput(formData.saida) : null,
        Observacoes: formData.observacoes,
        Descricao: formData.descricao
      };

      if (isEditing) {
        payload.idEquipamento = id;
        await axios.put(`http://localhost:3010/equipamento/${id}`, payload);
        Swal.fire('Sucesso', 'Registro atualizado com sucesso', 'success');
      } else {
        await axios.post('http://localhost:3010/equipamento', payload);
        Swal.fire('Sucesso', 'Registro incluído com sucesso', 'success');
      }

      navigate('/equipamentos');
    } catch (error) {
      Swal.fire('Erro', error.response?.data?.message || error.message, 'error');
    }
  };

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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna 1 */}
        <div className="space-y-4">
          <div className="col-span-2 mb-4">
            <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">Informações básicas</h2>
          </div>

          <div>
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
            <SelectCliente
              name="cliente"
              titulo="Cliente"
              options={clientes}
              value={formData.cliente}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <InputForm
              name="nome"
              content="Nome"
              value={formData.nome}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="Tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <SelectForm
              selectTitle="Tipo"
              selectFormList={["Solda", "Hidráulica", "Içamento e Carga", "Elétrica", "Torque", "Roscas", "Tubos"]}
              value={formData.Tipo}
              onChange={handleChange}
              name="Tipo"
            />
          </div>

          <div>
            <label htmlFor="saida" className="block text-sm font-medium text-gray-700 mb-1">Data Saída</label>
            <DataForm
              name="saida"
              content="Data Saída"
              value={formData.saida}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Coluna 2 */}
        <div className="space-y-4">
          <div className="col-span-2 mb-4">
            <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">Detalhes Técnicos</h2>
          </div>

          <div>
            <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <InputForm
              name="marca"
              content="Marca"
              value={formData.marca}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="serial" className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
            <InputForm
              name="serial"
              content="Serial Number"
              value={formData.serial}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="entrada" className="block text-sm font-medium text-gray-700 mb-1">Data Entrada</label>
            <DataForm
              name="entrada"
              content="Data Entrada"
              value={formData.entrada}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <TextAreaForm
            name="descricao"
            content="Descrição"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
          <TextAreaForm
            name="observacoes"
            content="Observações"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-3">
        <Link to={'/equipamentos'}>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
        </Link>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <IoCheckmark className="-ml-1 mr-2 h-5 w-5" />
          Salvar Equipamento
        </button>
      </div>
    </form>
  );
};

export default FormCadastroEquipamentos;