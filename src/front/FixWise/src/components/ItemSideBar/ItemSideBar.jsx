import React from 'react'
import { Link } from 'react-router-dom'


const ItemSideBar = (props) => {
  return (
    <div>
       <Link to={props.route}><li className='flex flex-nowrap w-[200px] items-center gap-4 p-2 hover:bg-white hover:text-black hover:cursor-pointer rounded-sm font-medium'><props.tagItem/>{props.nameItem}</li></Link>
    </div>
  )
}

export default ItemSideBar
