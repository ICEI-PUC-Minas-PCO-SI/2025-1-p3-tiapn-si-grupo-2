import React from 'react'

const TextAreaForm = (props) => {
  return (
    <textarea name={props.name} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder={props.content} />
  )
}

export default TextAreaForm
