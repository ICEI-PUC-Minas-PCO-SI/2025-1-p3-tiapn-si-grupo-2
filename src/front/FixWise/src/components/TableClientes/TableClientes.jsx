import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { IoCreateOutline, IoTrashOutline } from "react-icons/io5";

const TableClientes = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cliente");
      setClientes(res.data.clientes);
      console.log(res)

    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const handleEdit = (cliente) => {
    navigate(`/clientes/editar/${cliente.idCliente}`, {
      state: { cliente }
    });
  };

  const handleDelete = async (idCliente, navigate) => {
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
        const response = await axios.delete(`http://localhost:3010/cliente/${idCliente}`);

        console.log(response);
        // Mostra mensagem de sucesso
        await Swal.fire({
          title: 'Deletado!',
          text: 'O cliente foi removido com sucesso.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          background: '#fff'
        });

        // Redireciona ou atualiza a lista
        getClientes();
        // navigate('/equipamentos');
        // Ou: window.location.reload(); se preferir recarregar a página

      } catch (error) {
        // Mostra mensagem de erro
        await Swal.fire({
          title: 'Erro!',
          text: error.response?.data?.message || 'Ocorreu um erro ao deletar o cliente',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          background: '#fff'
        });
      }
    }

  }

  useEffect(() => {
    getClientes();
  }, [setClientes]); // <- Corrigido aqui: só executa uma vez


  console.log(clientes)

  return (
    <>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">CNPJ/CPF</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">E-mail</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cidade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">UF</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                clientes.map((cliente, index) => 
                  (
                    <tr key={cliente.idCliente} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.idCliente}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.Nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.CPF_CNPJ}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.EmailContato}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.Cidade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cliente.UF}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50" onClick={() => handleEdit(cliente)}>
                            <IoCreateOutline className="h-5 w-5" />
                          </button>

                          <button className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50" onClick={() => handleDelete(cliente.idCliente, navigate)}>
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
    </>
    // <div className="w-9/10 relative">
    //   <Table className="h-auto shadow-md">
    //     <TableHead >
    //       <TableRow className="bg-gray-500 w-full">
    //         <TableHeadCell>ID</TableHeadCell>
    //         <TableHeadCell>NOME</TableHeadCell>
    //         <TableHeadCell>IDADE</TableHeadCell>
    //         <TableHeadCell>CIDADE</TableHeadCell>
    //         <TableHeadCell>
    //           <span className="sr-only">Edit</span>
    //         </TableHeadCell>
    //         <TableHeadCell>
    //           <span className="sr-only">Remove</span>
    //         </TableHeadCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody className="divide-y">
    //       {users.map((user) => (
    //         <TableRow key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
    //           <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
    //             {user.id}
    //           </TableCell>
    //           <TableCell>{user.nome}</TableCell>
    //           <TableCell>{user.idade}</TableCell>
    //           <TableCell>{user.cidade}</TableCell>
    //           <TableCell>
    //             <button onClick={() => toggleModalEdit(user.id)}>Editar</button>
    //           </TableCell>
    //           <TableCell>
    //             <button onClick={() => toggleModalDelete(user.id)}>Deletar</button>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>

    //   {isEditable && <ModalEditCliente onClose={toggleModalEdit} idUser={idUser} />}
    //   {isRemovible && <ModalDeleteCliente onClose={toggleModalDelete} idUser={idUser} />}
    // </div>
  );
};

export default TableClientes;
