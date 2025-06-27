
const SelectForm = (props) => {
  return (
    
    <select 
      name={props.selectTitle} 
      value={props.value} 
      onChange={props.onChange}
      className='w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none'>
        <option key="0" value="">-- Selecione uma opção --</option>
        {props.selectFormList.map((option) =>(
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
   
  )
}

export default SelectForm