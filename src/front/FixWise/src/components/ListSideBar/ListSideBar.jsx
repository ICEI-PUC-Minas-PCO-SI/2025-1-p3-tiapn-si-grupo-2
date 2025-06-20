import React from "react";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiDatabase } from "react-icons/fi";
import { GrVmMaintenance } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import ItemSideBarDropdown from "../ItemSideBarDropdown/ItemSideBarDropdown";
import { IoKeyOutline, IoHomeSharp, IoConstructSharp, IoPersonSharp, IoLogOutSharp, IoPeopleSharp } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const ListSideBar = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoHomeSharp} nameItem="Home" route="/" />
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPersonSharp} nameItem="Clientes" route="/clientes" />
          <ItemSideBar isOpen={props.isOpen} tagItem={IoConstructSharp} nameItem="Equipamentos" route="/equipamentos" />
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPeopleSharp} nameItem="Funcionários" route="/funcionarios" />
          <ItemSideBarDropdown
            isOpen={props.isOpen}
            tagItem={FiDatabase}
            nameItem="Cadastros"
            listItemsDropdown={[
              {
                name: "Cliente",
                route: "/cadastro-clientes",
                tagItem: IoPersonSharp
              },
              {
                name: "Acessos",
                route: "/cadastro-acessos",
                tagItem: IoKeyOutline
              },
              {
                name: "Equipamentos",
                route: "/equipamentos",
                tagItem: CiBoxes
              },
              {
                name: "Manutenção",
                route: "/cadastro-manutencao",
                tagItem: GrVmMaintenance
              },
            ]}
          />
          {/* <ItemSideBarDropdown
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
           */}
          <ItemSideBar
            isOpen={props.isOpen}
            tagItem={GrVmMaintenance}
            nameItem="Manutenções Ativas"
            route="/manutencoes"
          />

        </ul>
        <ItemSideBar isOpen={props.isOpen} tagItem={IoLogOutSharp} nameItem="Sair" route="/login" />
      </div>
    </>
  );
};

export default ListSideBar;
