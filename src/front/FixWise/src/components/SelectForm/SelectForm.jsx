import React from 'react'

const SelectForm = (props) => {
  return (
    <div className='flex flex-col w-auto gap-2'>
        <label htmlFor="" className='text-lg'>Tipo</label>
        <select name={props.selectTitle} id="" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
            {props.selectFormList.map((option) =>(
                <option>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectForm