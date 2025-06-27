import { ReactComponent as PlusIcon } from '../../assets/add-outline.svg'
import { IoSearch, IoFunnelOutline } from "react-icons/io5";
import { Link } from "react-router-dom"
import TableFuncionarios from '../../components/TableFuncionarios/TableFuncioanarios';

export default function Funcionarios() {
    return (
        <>
            <div className="p-6 bg-white min-h-screen">
                <div className="max-w-7x1 mx-auto">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Funcionários</h1>
                            <p className="text-lg text-gray-600">Gerencie os funcionários registrados no sistema</p>
                        </div>

                        <Link to={"/funcionarios/novo"}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Cadastrar Funcionário
                            </button>
                        </Link>

                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md-justify-between gap-4">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IoSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Buscar por nome, tipo, marca ou cliente"
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <IoFunnelOutline className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                            Filtros
                        </button>
                    </div>
                </div>

                <TableFuncionarios />
            </div>
        </>
    )
}