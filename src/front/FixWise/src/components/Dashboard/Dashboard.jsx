import React from "react";
import ListCardsTotalItems from "../ListCardsTotalItems/ListCardsTotalItems";
import CardManutencoesPendentes from "../CardManutencoesPendentes/CardManutencoesPendentes";
import CardLogAtividades from "../CardLogAtividades/CardLogAtividades";

const Dashboard = () => {
  return (
    <div className="p-10 w-full">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <ListCardsTotalItems />
      <div className="flex justify-between">
        <CardLogAtividades />
        <CardManutencoesPendentes />
      </div>
    </div>
  );
};

export default Dashboard;
