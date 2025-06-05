import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import FormCadastroEquipamentos from "../../components/FormCadastroEquipamentos/FormCadastroEquipamentos.jsx";
import { ReactComponent as PlusIcon } from '../../assets/add-outline.svg'
import axios from "axios"
import TableEquipamentos from "../../components/TableEquipamentos/TableEquipamentos.jsx";

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleOpenModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

    const getEquipamentos = async () => {
        try {
            const res = await axios.get("http://localhost:8080/equipamento");

            setEquipamentos(res.data.sort((a, b) => (a.Nome > b.Nome ? 1 : -1)));

        } catch (error) {
            console.log(error)
        }
    }

    const Form = () => {
        return (
            <FormCadastroEquipamentos onEdit={onEdit} setOnEdit={setOnEdit} getClientes={getClientes} />
        )
    }

    useEffect(() => {
        getEquipamentos();
    }, [setEquipamentos]);

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="p-10 w-full ">
                    <h1 className='font-bold text-4xl'>Equipamentos</h1>
                    <TableEquipamentos onEdit={onEdit} setOnEdit={setOnEdit}/>

                </div>
            </div>

        </>
    );
}