import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const ItemSideBarDropdown = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleDropDown}
        className={`flex items-center ${props.isOpen ? "justify-between" : "justify-center"} gap-4 p-2 hover:bg-white hover:text-black hover:cursor-pointer rounded-sm font-medium`}
      >
        <div className="flex items-center gap-4">
          <props.tagItem />
          {props.isOpen ? props.nameItem : "" }
        </div>
        {props.isOpen &&(
         isOpen ? <FaAngleUp /> : <FaAngleDown />)}
      </div>

      {props.isOpen && isOpen && (
        <ul className="ml-6 mt-1">
          {props.listItemsDropdown.map((item, index) => (
            <Link to={item.route}>

              <li
                key={index}
                className="flex items-center gap-4 p-2 hover:bg-white hover:text-black hover:cursor-pointer rounded-sm font-medium flex-wrap"
              >
                <item.tagItem />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemSideBarDropdown;
