import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GraficoManutencoesPorMes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const carregaDados = async () => {
        try {
            const res = await axios.get('http://localhost:3010/cadastromanutencao/manutencoes-por-mes');
            
            // Verificação adicional de segurança
            if (!res.data?.manutencoes) {
                throw new Error('Formato de dados inválido da API');
            }

            const dadosFormatados = res.data.manutencoes.map(item => ({
                month: item.Mes ? formatarMes(item.Mes) : 'Mês inválido',
                manutencoes: Number(item.quant) || 0
            }));

            setData(dadosFormatados);
            setLoading(false);
            
            console.log('Dados formatados:', dadosFormatados);
        } catch(err) {
            console.error("Erro ao buscar manutenções:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    const formatarMes = (mesNumero) => {
        try {
            const str = mesNumero.toString();
            if (str.length !== 6) return str;
            
            const ano = str.substring(0, 4);
            const mes = str.substring(4, 6);
            const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            return `${meses[parseInt(mes)-1]}/${ano}`;
        } catch {
            return mesNumero;
        }
    };

    useEffect(() => {
        carregaDados();
    }, []); // Removi setData das dependências

    if (loading) return (
        <div className="bg-slate-800 rounded-lg shadow border border-slate-700 p-4 mb-8 h-80 flex items-center justify-center">
            <div className="animate-pulse text-slate-400">Carregando dados...</div>
        </div>
    );

    if (error) return (
        <div className="bg-slate-800 rounded-lg shadow border border-slate-700 p-4 mb-8 h-80 flex items-center justify-center">
            <div className="text-red-400">Erro: {error}</div>
        </div>
    );

    return (
        <div className="bg-slate-800 rounded-lg shadow border border-slate-700 p-4 w-6/10">
            <h2 className="text-slate-200 text-lg font-semibold mb-4">Manutenções por Mês</h2>
            
            {data.length > 0 ? (
                <div className="h-100"> {/* Aumentei a altura para 80 */}
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="#334155" 
                                vertical={false}
                            />
                            <XAxis 
                                dataKey="month"
                                tick={{ fill: '#e2e8f0', fontSize: 12}}
                                label={{ value: 'Mês', position: 'insideBottomRight', offset: -10 }}
                            />
                            <YAxis 
                                tick={{ fill: '#e2e8f0', fontSize: 12 }}
                                label={{ value: 'Quantidade', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    borderColor: '#334155',
                                    borderRadius: '6px',
                                    color: '#e2e8f0',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                                }}
                                formatter={(value) => [`${value}`, 'Manutenções']}
                            />
                            <Legend 
                                wrapperStyle={{ 
                                    paddingTop: 0,
                                    color: '#e2e8f0'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="manutencoes"
                                stroke="#7c3aed"
                                strokeWidth={2}
                                activeDot={{ r: 8, fill: '#7c3aed' }}
                                dot={{ r: 4, fill: '#7c3aed' }}
                                name="Manutenções"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="h-80 flex items-center justify-center text-slate-400">
                    Nenhum dado disponível para exibir
                </div>
            )}
            
            <div className="mt-2 text-xs text-slate-400">
                Última atualização: {new Date().toLocaleString('pt-BR')}
            </div>
        </div>
    );
}