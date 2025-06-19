import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { GrVmMaintenance } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import ItemSideBarDropdown from "../ItemSideBarDropdown/ItemSideBarDropdown";
import { IoKeyOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const AtividadeRecente = (props) => {
  return (
    <div className="flex items-center gap-5 mt-5">
      <div className="bg-gray-300 h-[40px] w-[40px] rounded-full flex items-center justify-center">
        <props.imgTag className=""/>
      </div>
      <div>
        <p className="font-medium">{props.title}</p>
        <p className="text-gray-600">{props.data}</p>
      </div>
    </div>
  );
};

export default AtividadeRecente;
