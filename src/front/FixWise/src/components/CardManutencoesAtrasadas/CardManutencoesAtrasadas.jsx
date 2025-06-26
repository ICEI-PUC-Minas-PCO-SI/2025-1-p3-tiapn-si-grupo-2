import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCog, IoCalendar, IoHammer, IoAlertSharp } from "react-icons/io5";
import ListManutencoes from "../ListManutencoes/ListManutencoes";

const CardManutencoesAtrasadas = () => {
  const [manutencoes, setManutencoes] = useState([]);
  const [manutencoesAtrasadas, setManutencoesAtrasadas] = useState([]);

  const getManutencoes = async () => {
    try {
      const res = await axios.get("http://localhost:3010/cadastromanutencao");
      console.log("manutencoes", res);
      setManutencoes(res.data.manutencoes);
      setManutencoesAtrasadas(
        res.data.manutencoes.filter(
          (manutencao) =>
            new Date(manutencao.DataSaida) < new Date() &&
            manutencao.Status !== "Finalizada"
        )
      );
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    }
  };

  console.log(manutencoesAtrasadas);

  useEffect(() => {
    getManutencoes();
  }, [setManutencoes]);

  return (
    <>
      <div className="bg-white overflow-hidden rounded-lg mb-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Manutenções Atrasadas
          </h3>
        </div>
        <div className="px-0 py-0 sm:px-0 flex items-center justify-center bg-gray-50">
          <div className="w-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nº Manutenção
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Equipamento
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Técnico Responsável
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Data de Prazo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manutencoesAtrasadas.length > 0 ? (
                  manutencoesAtrasadas.map((manutencao) => (
                    <tr
                      key={manutencao.idManutencao}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoHammer className="flex-shrink-0 h-4 w-4 text-blue-500 mr-2" />
                          <span className="font-medium text-gray-900">
                            {manutencao.idManutencao}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {manutencao.nomeEquipamento}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoCog className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {manutencao.nomeResponsavel}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoCalendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {new Date(manutencao.DataSaida).toLocaleDateString(
                              "pt-BR"
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IoAlertSharp className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {manutencao.Status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      Nenhuma manutenção atrasada encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardManutencoesAtrasadas;
