import React from 'react'

const InputForm = (props) => {
  return (
    <div className="flex flex-col w-auto gap-2">
        <label htmlFor="" className="text-lg">{props.content}</label>
        <input className="w-80 px-2 py-1 ring rounded-sm" type="text" placeholder={props.content} />
    </div>
  )
}

export default InputForm
