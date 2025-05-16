import React from "react";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { GrVmMaintenance } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import ItemSideBarDropdown from "../ItemSideBarDropdown/ItemSideBarDropdown";
import { IoKeyOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";


const ListSideBar = () => {
  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar tagItem={LuLayoutDashboard} nameItem="Dashboard" route="/"/>
          <ItemSideBarDropdown
            tagItem={FiDatabase}
            nameItem="Cadastros"
            listItemsDropdown={[
              { 
                name: "Cliente", 
                route: "/cadastro-clientes",
                tagItem: IoPersonOutline
              },
              {
                name: "Acessos",
                route: "/cadastro-acessos",
                tagItem: IoKeyOutline
              },
              {
                name: "Produtos",
                route: "/cadastro-equipamentos",
                tagItem: CiBoxes
              },
              {
                name: "Manutenção",
                route: "/cadastro-manutencao",
                tagItem: GrVmMaintenance
              },
            ]}
          />
          <ItemSideBarDropdown
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
          <ItemSideBar tagItem={IoPersonOutline} nameItem="Clientes" route="/clientes"/>
          <ItemSideBar
            tagItem={GrVmMaintenance}
            nameItem="Manutenções Ativas"
            route="/manutencoes"
          />
        </ul>
        <ItemSideBar tagItem={CiSettings} nameItem="Configurações" route="/configuracoes" />
      </div>
    </>
  );
};

export default ListSideBar;
