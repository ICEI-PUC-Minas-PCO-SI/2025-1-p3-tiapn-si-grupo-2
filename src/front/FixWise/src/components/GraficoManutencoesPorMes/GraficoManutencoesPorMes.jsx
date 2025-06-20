import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GraficoManutencoesPorMes() {
    const [data, setData] = useState([])

    const buscarManutencoes = async () => {
        try {
            const res = await axios.get("http://localhost:3010/cadastromanutencao/manutencoes-por-mes");
            setData(res.data.manutencoes);

            // console.log(res.data.manutencoes)

        } catch (error) {
            console.error("Erro ao buscar equipamentos:", error);
        }
    }
    
    useEffect(
        () => {
            buscarManutencoes();
        }, [setData]
    );
    

    return (
        <>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="manutencoes"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Manutenções"
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}