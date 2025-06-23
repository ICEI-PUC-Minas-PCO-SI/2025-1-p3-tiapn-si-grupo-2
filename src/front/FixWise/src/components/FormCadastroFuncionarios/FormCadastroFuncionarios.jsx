import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IoCheckmark } from 'react-icons/io5'

// Importe seus componentes personalizados
import InputForm from '../InputForm/InputForm'

export default function FormCadastroFuncionarios() {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        confirmSenha: '',
        tipo: '',
        email: '',
        confirmEmail: ''
    });

    const isEditing = !!id;

    useEffect(() => {
        if (isEditing && state?.funcionario) {
            const funcionario = state.funcionario;

            setFormData({
                nome: funcionario.Nome || '',
                tipo: funcionario.TipoUsuario || '',
                email: funcionario.Email || '',
                senha: '',
                confirmSenha: '',
                confirmEmail: funcionario.Email || ''
            });
        }
    }, [isEditing, state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nome) {
            Swal.fire('Atenção', 'Informe o nome!', 'warning');
            return;
        }

        if (!formData.email) {
            Swal.fire('Atenção', 'Informe o email!', 'warning');
            return;
        }

        if (formData.email !== formData.confirmEmail) {
            Swal.fire('Atenção', 'Os emails não correspondem!', 'warning');
            return;
        }

        if (!formData.senha) {
            Swal.fire('Atenção', 'Informe a senha!', 'warning');
            return;
        }

        if (formData.senha != formData.confirmSenha) {
            Swal.fire('Atenção', 'Senhas são diferentes!', 'warning');
            return;
        }

        if (!formData.tipo) {
            Swal.fire('Atenção', 'Informe o tipo!', 'warning');
            return;
        }

        try {

            const payload = {
                Nome: formData.nome,
                Senha: formData.senha,
                TipoUsuario: formData.tipo,
                Email: formData.email
            };

            if (isEditing) {
                payload.idUsuario = id;
                await axios.put(`http://localhost:3010/funcionario/${id}`, payload);
                Swal.fire('Sucesso', 'Registro atualizado com sucesso', 'success');
            } else {
                await axios.post('http://localhost:3010/funcionario', payload);
                Swal.fire('Sucesso', 'Registro incluído com sucesso', 'success');
            }

            navigate('/funcionarios');
        } catch (error) {
            Swal.fire('Erro', error.response?.data?.message || error.message, 'error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden rounded-lg p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">Informações do Funcionário</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                                <InputForm
                                    name="nome"
                                    content="Nome"
                                    value={formData.nome}
                                    onChange={handleChange} />
                            </div>                            

                            <div>
                                <label htmlFor='senha' className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                                <InputForm
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    type="password"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <InputForm
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                            
                                <select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                    className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none'>
                                    <option key={0} value="">-- Informe uma opção --</option>
                                    <option key={1} value={1}>Administrador</option>
                                    <option key={2} value={2}>Funcionário</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor='confirmSenha' className="block text-sm font-medium text-gray-700 mb-1">Confirma Senha</label>
                                <InputForm
                                    name="confirmSenha"
                                    type="password"
                                    value={formData.confirmSenha}
                                    onChange={handleChange}
                                />
                            </div>                           

                            <div>
                                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Email *</label>
                                <InputForm
                                    name="confirmEmail"
                                    type="email"
                                    value={formData.confirmEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                    <Link to={'/funcionarios'}>
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
                        Salvar Funcionário
                    </button>
                </div>
            </form>
        </div>
    );
}