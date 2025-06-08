export default function SelectCliente({title, options, name}) {
    return (
 
        <select name={name} id={name} className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none'>
            <option value="">Selecione um cliente</option>
            {options.map((option) => (
                <option key={option.idCliente} value={option.idCliente}>{option.Nome}</option>
            ))}
        </select>

    )
}