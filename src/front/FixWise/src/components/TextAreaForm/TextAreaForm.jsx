import React from 'react'

const TextAreaForm = (props) => {
  return (
    <div className="flex flex-col gap-2 ">
        <label htmlFor="" className="text-lg">{props.content}</label>
        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[94%] h-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none" type="text" placeholder={props.content} />
    </div>
  )
}

export default TextAreaForm
