import React from 'react'

const TextAreaForm = (props) => {
  return (
    <div className="flex flex-col w-auto">
        <label htmlFor="" className="text-lg">{props.content}</label>
        <textarea className="w-[76%] h-30 px-2 py-1 ring rounded-sm resize-none" type="text" placeholder={props.content} />
    </div>
  )
}

export default TextAreaForm
