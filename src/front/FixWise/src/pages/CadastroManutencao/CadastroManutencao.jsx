import FormCadastroManutencao from '../../components/FormCadastroManutencao/FormCadastroManutencao'
import { IoConstructOutline } from 'react-icons/io5'

const CadastroEquipamentos = () => {
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7x1 mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Manutenções</h1>
              <p className="text-lg text-gray-600">Insira uma nova manutenção</p>
            </div>
          </div>
        </div>

       <FormCadastroManutencao />
      </div>
    </>

  )
}

export default CadastroEquipamentos
