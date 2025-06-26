import CardsTotalItems from "../CardsTotalItems/CardsTotalItems";
import {
  IoPricetag,
  IoAlertCircle,
  IoPerson,
  IoCog,
  IoAlarm,
} from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { isAfter } from "date-fns";

const ListCardsTotalItems = () => {
  const [numberClientes, setNumberClientes] = useState(0);
  const [numberEquipamentos, setNumberEquipamentos] = useState(0);
  const [numberManutencoes, setNumberManutencoes] = useState(0);
  const [numberAlerts, setNumberAlerts] = useState(0);
  const [manutencoesAlertList, setManutencoesAlertList] = useState([]);
  const [manutencoesList, setManutencoesList] = useState([]);
  let manutencoesAtrasadas = 0;
  const getClientes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cliente");
      setNumberClientes(res.data.total);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const getEquipamentos = async () => {
    try {
      const res = await axios.get("http://localhost:3010/equipamento");
      setNumberEquipamentos(res.data.total);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    }
  };

  const getManutencoes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cadastromanutencao");
      setNumberManutencoes(res.data.total);
      setManutencoesList(res.data.manutencoes);
      setManutencoesAlertList(
        res.data.manutencoes.filter(
          (manutencao) => new Date(manutencao.DataSaida) < new Date() && manutencao.Status !== "Finalizada"
        )
      );
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    }
  };

  useEffect(() => {
    getClientes();
    getEquipamentos();
    getManutencoes();
  }, [setNumberClientes, setNumberEquipamentos, setNumberManutencoes]);

  useEffect(() => {
  setNumberAlerts(manutencoesAlertList.length);
}, [manutencoesAlertList]); // roda toda vez que a lista for atualizada

  return (
    <>
      <CardsTotalItems
        title="Total de Clientes"
        tagItem={IoPerson}
        number={numberClientes}
      />
      <CardsTotalItems
        title="Equipamentos Cadastrados"
        tagItem={IoPricetag}
        number={numberEquipamentos}
      />
      <CardsTotalItems
        title="Manutenções Ativas"
        tagItem={IoCog}
        number={numberManutencoes}
      />
      <CardsTotalItems
        title="Alertas"
        tagItem={IoAlertCircle}
        number={numberAlerts}
      />
    </>
  );
};

export default ListCardsTotalItems;
