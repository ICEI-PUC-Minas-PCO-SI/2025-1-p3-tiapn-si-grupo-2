import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import { IoTrashOutline, IoCreateOutline } from "react-icons/io5";

export default function TableFuncionarios() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);

    const getFuncionarios = async () => {
        try {
            const res = await axios.get("http://localhost:3010/funcionario");
            setFuncionarios(res.data.funcionarios);

        } catch (error) {
            console.error("Erro ao buscar equipamentos:", error);
        }
    };

    useEffect(() => {
        getFuncionarios();
    }, [setFuncionarios]);

    const handleEdit = (funcionario) => {
        navigate(`/funcionarios/editar/${funcionario.idFuncionario}`, {
            state: { funcionario }
        });
    };

    const handleDelete = async (idFuncionario) => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Você não poderá reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar',
            background: '#fff'
        });

        if (result.isConfirmed) {
            try {
                // Faz a requisição para deletar
                const response = await axios.delete(`http://localhost:3010/funcionario/${idFuncionario}`);

                console.log(response);
                // Mostra mensagem de sucesso
                await Swal.fire({
                    title: 'Deletado!',
                    text: 'O funcionário foi removido com sucesso.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    background: '#fff'
                });

                // Redireciona ou atualiza a lista
                getFuncionarios();
                // navigate('/equipamentos');
                // Ou: window.location.reload(); se preferir recarregar a página

            } catch (error) {
                // Mostra mensagem de erro
                await Swal.fire({
                    title: 'Erro!',
                    text: error.response?.data?.message || 'Ocorreu um erro ao deletar o funcionário',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    background: '#fff'
                });
            }
        }

    }

    const funcionariosFiltrados = funcionarios.filter((cadastro) =>
        `${cadastro.Nome} ${cadastro.TipoUsuario}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nome</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                funcionarios.map(
                                    (cadastro, index) => (
                                        <tr key={cadastro.idUsuario} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cadastro.idUsuario}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{cadastro.Nome}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cadastro.TipoUsuario}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex justify-center items-center space-x-2">
                                                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50" onClick={() => handleEdit(cadastro)}>
                                                        <IoCreateOutline className="h-5 w-5" />
                                                    </button>

                                                    <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50" onClick={() => handleDelete(cadastro.idUsuario)}>
                                                        <IoTrashOutline className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginação (opcional) */}
            {funcionariosFiltrados.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{' '}
                                <span className="font-medium">{funcionariosFiltrados.length}</span> resultados
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    &lt;
                                </a>
                                <a
                                    href="#"
                                    aria-current="page"
                                    className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <span className="sr-only">Próxima</span>
                                    &gt;
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}