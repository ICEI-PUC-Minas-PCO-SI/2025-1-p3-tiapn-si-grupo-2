import React from "react";
import ManutencoesPendentes from "../ManutencoesPendentes/ManutencoesPendentes";

const ListManutencoes = () => {
  return (
    <div>
      <ul className="mt-4 flex flex-col gap-2">
        <ManutencoesPendentes nomeCliente="Equilibrium" id="1" />
        <ManutencoesPendentes nomeCliente="Equilibrium" id="2" />
        <ManutencoesPendentes nomeCliente="Equilibrium" id="3" />
        <ManutencoesPendentes nomeCliente="Equilibrium" id="4" />
        <ManutencoesPendentes nomeCliente="Equilibrium" id="5" />
        <ManutencoesPendentes nomeCliente="Equilibrium" id="6" />
      </ul>
    </div>
  );
};

export default ListManutencoes;
