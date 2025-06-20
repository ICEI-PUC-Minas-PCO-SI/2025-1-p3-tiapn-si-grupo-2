import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GraficoManutencoesPorMes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buscarManutencoes = async () => {
        try {
            const res = await axios.get("http://localhost:3010/cadastromanutencao/manutencoes-por-mes");
            setData(res.data.manutencoes);
        } catch (error) {
            console.error("Erro ao buscar manutenções:", error);
            setError("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        buscarManutencoes();
    }, []); // Removi o setData das dependências

    if (loading) return <div>Carregando gráfico...</div>;
    if (error) return <div>{error}</div>;
    if (!data || data.length === 0) return <div>Nenhum dado disponível</div>;
    
    return (
        <div style={{ width: '100%', height: 400, margin: '20px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Manutenções por Mês</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#555' }}
                        label={{ value: 'Mês', position: 'insideBottomRight', offset: -5 }}
                    />
                    <YAxis 
                        label={{ value: 'Quantidade', angle: -90, position: 'insideLeft' }}
                        tick={{ fill: '#555' }}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: '5px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="manutencoes"
                        stroke="#8884d8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Manutenções"
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}