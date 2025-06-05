import FormCadastroEquipamentos from "../FormCadastroEquipamentos/FormCadastroEquipamentos"

export default function ModalEquipamento({onEdit, setOnEdit, getEquipamentos}) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white shadow-md flex flex-col h-auto w-full max-w-md p-5 gap-5 rounded">
                <FormCadastroEquipamentos onEdit={onEdit} setOnEdit={setOnEdit} getEquipamentos={getEquipamentos} />
            </div>
        </div>
    )
}