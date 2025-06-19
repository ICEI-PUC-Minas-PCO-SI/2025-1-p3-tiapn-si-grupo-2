import React from 'react'
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
import AtividadeRecente from '../AtividadeRecente/AtividadeRecente';

const CardLogAtividades = () => {
  return (
    <div className='p-6 rounded-md w-5/10 flex flex-col mt-10 h-3/6 overflow-auto shadow-md hover:cursor-pointer'>
        <h1 className='text-xl font-bold'>Atividades recentes</h1>
        <AtividadeRecente imgTag={IoPersonOutline} title="Novo cliente cadastrado" data="Há 1 hora" />
        <AtividadeRecente imgTag={CiBoxes} title="Produto atualizado" data="Há 2 hora" />
        <AtividadeRecente imgTag={GrVmMaintenance} title="Nova manutenção registrada" data="Há 3 hora" />
        <AtividadeRecente imgTag={CiBoxes} title="Novo produto cadastrado" data="Há 5 hora" />
        <AtividadeRecente imgTag={IoPersonOutline} title="Status da manutenção #7 atualizado" data="Há 7 hora" />
    </div>
  )
}

export default CardLogAtividades
