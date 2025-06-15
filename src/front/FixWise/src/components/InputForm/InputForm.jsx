const InputForm = (props) => {
 
  return (
    <input 
      name={props.name} 
      id={props.name}
      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
      type={props.type || 'text'} 
      placeholder={props.content} 
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default InputForm
