import Cliente from "../../components/Cliente/Cliente";
import TableClientes from "../../components/TableClientes/TableClientes";
import { Link } from "react-router-dom";
import { ReactComponent as PlusIcon } from '../../assets/add-outline.svg'

export default function Clientes() {
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen w-full">
        <div className="max-w-7x1 mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Clientes</h1>
              <p className="text-lg text-gray-600">Gerencie os clientes registrados no sistema</p>
            </div>

            <Link to={"/clientes/novo"}>
              <button className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Cadastrar Cliente
              </button>
            </Link>

          </div>
        </div>

        <TableClientes />
      </div>
    </>
  )
}

// const Clientes = () => {
//   return (
//     <TableClientes />
//   );
// };

// export default Clientes;
