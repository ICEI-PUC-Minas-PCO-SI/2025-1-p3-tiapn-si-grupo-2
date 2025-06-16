import { ReactComponent as PlusIcon } from '../../assets/add-outline.svg'

import axios from "axios"
import TableEquipamentos from "../../components/TableEquipamentos/TableEquipamentos.jsx";
import { Link } from "react-router-dom";
import TableManutencoes from '../../components/TableManutencoes/TableManutencoes.jsx';

export default function Manutencoes() {
    return (
        <>
            <div className="p-6 bg-white min-h-screen">
                <div className="max-w-7x1 mx-auto">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Manutenções</h1>
                            <p className="text-lg text-gray-600">Gerencie as manutenções em andamento</p>
                        </div>

                        <Link to={"/manutencoes/novo"}>
                            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Cadastrar Manutenção
                            </button>
                        </Link>

                    </div>
                </div>

              
                <TableManutencoes />
            </div>
        </>
    );
}