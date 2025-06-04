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

const FormCadastroEquipamentos = ({ onEdit, setOnEdit, getEquipamentos }) => {
  const ref = useRef();
  const [clientes, setClientes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equip = ref.current;

    const dataEntrada = equip.entrada.value != '' ? new Date(equip.entrada.value) : null;

    const dataSaida = equip.saida.value != '' ? new Date(equip.saida.value) : null;

    console.log(equip);

    if (onEdit) {
      await axios.put('http://localhost:8080/equipamento',
        {

        }
      )
    } else {
      await axios.post('http://localhost:8080/equipamento',
        {
          "Cliente_idCliente": +equip.cliente.value,
          "Nome": equip.nome.value,
          "Tipo": equip.Tipo.value,
          "Marca": equip.marca.value,
          "SerialNumber": equip.serial.value,
          "DataEntrada": dataEntrada,
          "DataSaida": dataSaida
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
      const res = await axios.get("http://localhost:8080/cliente");

      setClientes(res.data.sort((a, b) => (a.Nome > b.Nome ? 1 : -1)));
    } catch (error) {
      Swal.fire('Erro', error)
    }
  }

  useEffect(() => {
    getClientes();
  }, [setClientes]);

  

  return (
    <div>
      <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-5" ref={ref}>
        <div className="grid grid-cols-3 gap-y-5 gap-x-0 mt-5 place-items-left">
          {/* <InputForm name="cliente" content="Cliente" /> */}
          <SelectCliente name="cliente" titulo="Cliente" options={clientes} />
          <InputForm name="nome" content="Nome" />
          <SelectForm selectTitle="Tipo" selectFormList={["Solda", "Hidráulica", "Içamento e Carga", "Elétrica", "Torque", "Roscas", "Tubos"]} />
          <InputForm name="marca" content="Marca" />
          {/* <InputForm name="status" content="Status" /> */}
          <InputForm name="serial" content="Serial Number" />
          <DataForm name="entrada" content="Data Entrada" />
          <DataForm name="saida" content="Data Saída" />
        </div>
        <div className="flex flex-col gap-5">
          {/* <TextAreaForm content="Descrição" /> */}
          <TextAreaForm content="Observações" />
        </div>
        <div className="flex gap-5 mt-5">
          <Link to="/"><BotaoCancelar /></Link>
          <BotaoSalvar />
        </div>
      </form>
    </div>
  )
}

export default FormCadastroEquipamentos
