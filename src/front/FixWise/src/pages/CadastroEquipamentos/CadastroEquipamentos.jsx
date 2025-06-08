import FormCadastroEquipamentos from '../../components/FormCadastroEquipamentos/FormCadastroEquipamentos'
import { IoConstructOutline } from 'react-icons/io5'

const CadastroEquipamentos = () => {
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7x1 mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Equipamento</h1>
              <p className="text-lg text-gray-600">Insira um novo equipamento</p>
            </div>
          </div>
        </div>

        <FormCadastroEquipamentos />
      </div>
      {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className='text-3xl font-bold flex items-center gap-2'>
            <IoConstructOutline />
            Equipamentos
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os equipamentos registrados no sistema</p>
        </div>
        
      </div> */}
    </>

  )
}

export default CadastroEquipamentos
