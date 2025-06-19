import React from 'react'
import { Link } from 'react-router-dom'



const ItemSideBar = (props) => {
  return (
    <div>
      
       <Link to={props.route}><li className={` ${props.isOpen ? "w-[200px] flex flex-nowrap items-center gap-4 p-2  " : "p-1"} hover:bg-white py-2 hover:text-black hover:cursor-pointer rounded-sm font-medium`}><props.tagItem />{props.isOpen ? props.nameItem : ""}</li></Link>
    </div>
  )
}

export default ItemSideBar
