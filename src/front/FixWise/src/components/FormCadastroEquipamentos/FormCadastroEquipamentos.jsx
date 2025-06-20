import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import InputForm from '../InputForm/InputForm'
import TextAreaForm from '../TextAreaForm/TextAreaForm'
import { Link } from 'react-router-dom'
import BotaoCancelar from '../BotaoCancelar/BotaoCancelar'
import BotaoSalvar from '../BotaoSalvar/BotaoSalvar'
import SelectForm from '../SelectForm/SelectForm'
import SelectCliente from '../Select/SelectCliente'
import DataForm from '../DataForm/DataForm'
import Swal from 'sweetalert2'
import { IoCheckmark } from 'react-icons/io5' 

const FormCadastroEquipamentos = ({ onEdit, setOnEdit, getEquipamentos }) => {
  const ref = useRef();
  const [clientes, setClientes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equip = ref.current;

    const dataEntrada = equip.entrada.value != '' ? new Date(equip.entrada.value) : null;

    const dataSaida = equip.saida.value != '' ? new Date(equip.saida.value) : null;

    console.log(equip.cliente.value)
    if (equip.cliente.value == '') {
      Swal.fire(
        'Atenção', 'Informe o cliente!', 'warning'
      )
      return;
    }

    console.log(equip);

    if (onEdit) {
      const res = await axios.put('http://localhost:8080/equipamento',
        {
          "Cliente_idCliente": +equip.cliente.value,
          "Nome": equip.nome.value,
          "Tipo": equip.Tipo.value,
          "Marca": equip.marca.value,
          "SerialNumber": equip.serial.value,
          "DataEntrada": dataEntrada,
          "DataSaida": dataSaida,
          "idEquipamento": onEdit.idEquipamento
        }
      )

      if (res.status == 200) {
        Swal.fire({
          title: 'Sucesso',
          text: 'Registro atualizado com sucesso',
          icon: 'success'
        })
      }
    } else {
      await axios.post('http://localhost:8080/equipamento',
        {
          "Cliente_idCliente": +equip.cliente.value,
          "Nome": equip.nome.value,
          "Tipo": equip.Tipo.value,
          "Marca": equip.marca.value,
          "SerialNumber": equip.serial.value,
          "DataEntrada": dataEntrada,
          "DataSaida": dataSaida,
          "Observacoes": equip.observacoes.value
        }
      )

      Swal.fire({
        title: 'Sucesso',
        text: 'Registro incluído com sucesso',
        icon: 'success'
      })
    }

    // setOnEdit(null);
    // getEquipamentos();
  }

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cliente");

      setClientes(res.data.clientes.sort((a, b) => (a.Nome > b.Nome ? 1 : -1)));
    } catch (error) {
      Swal.fire('Erro', error)
    }
  }

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  useEffect(() => {
    if (onEdit) {
      const equip = ref.current;
      console.log('onEdit', onEdit)

      equip.nome.value = onEdit.Nome;
      equip.Tipo.value = onEdit.Tipo;
      equip.cliente.value = onEdit.Cliente_idCliente;
      equip.marca.value = onEdit.Marca;
      equip.serial.value = onEdit.SerialNumber;
      if (onEdit.DataEntrada)
        equip.entrada.value = onEdit.DataEntrada;
      if (onEdit.DataSaida)
        equip.saida.value = onEdit.DataSaida;
      equip.observacoes.value = onEdit.Observacoes;
    }
  }), [onEdit];

  return (
    <>
      <form onSubmit={handleSubmit} ref={ref} className="bg-white shadow overflow-hidden rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="col-span-2 mb-4">
              <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">Informações básicas</h2>
            </div>

            <div>
              <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
              <SelectCliente name="cliente" titulo="Cliente" options={clientes} />
            </div>

            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <InputForm name="nome" content="Nome" />
            </div>

            <div>
              <label htmlFor="Tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
              <SelectForm selectTitle="Tipo" selectFormList={["Solda", "Hidráulica", "Içamento e Carga", "Elétrica", "Torque", "Roscas", "Tubos"]} />
            </div>

            <div>
              <label htmlFor="Tipo" className="block text-sm font-medium text-gray-700 mb-1">Data Saída</label>
              <DataForm name="saida" content="Data Saída" />
            </div>            
          </div>

          <div className="space-y-4">
            <div className="col-span-2 mb-4">
              <h2 className="text-sl font-semibold text-gray-700 border-b pb-2">Detalhes Técnicos</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <InputForm name="marca" content="Marca" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
              <InputForm name="serial" content="Serial Number" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Entrada</label>
              <DataForm name="entrada" content="Data Entrada" />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <TextAreaForm name="observacoes" content="Observações" />
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
    </>

  )
}

export default FormCadastroEquipamentos
