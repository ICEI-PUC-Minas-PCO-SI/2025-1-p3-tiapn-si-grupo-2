import React from "react";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
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



const ListSideBar = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar isOpen={props.isOpen} tagItem={LuLayoutDashboard} nameItem="Dashboard" route="/"/>
          <ItemSideBarDropdown
          isOpen={props.isOpen}
            tagItem={FiDatabase}
            nameItem="Ativos"
            listItemsDropdown={[
              {
                name: "Internos",
                route: "internos",
                tagItem: IoHomeOutline
              },
              {
                name: "Externos",
                route: "externos",
                tagItem: IoIosLogOut
              },
            ]}
          />
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPersonOutline} nameItem="Clientes" route="/clientes"/>
          <ItemSideBar
            isOpen={props.isOpen}
            tagItem={GrVmMaintenance}
            nameItem="Manutenções Ativas"
            route="/manutencoes"
          />
           <ItemSideBar
            isOpen={props.isOpen}
            tagItem={IoKeyOutline}
            nameItem="Acessos"
            route="/acessos"
          />
          
          
        </ul>
        <ItemSideBar isOpen={props.isOpen} tagItem={CiLogout} nameItem="Sair" route="/login"/>
      </div>
    </>
  );
};

export default ListSideBar;
