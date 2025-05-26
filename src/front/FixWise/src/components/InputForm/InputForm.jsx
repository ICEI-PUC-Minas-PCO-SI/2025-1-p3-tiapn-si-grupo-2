import React from 'react'

const InputForm = (props) => {
  return (
    <div className="flex flex-col w-auto gap-2">
        <label htmlFor="" className="text-lg">{props.content}</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder={props.content} />
    </div>
  )
}

export default InputForm
