import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const imuData = [
    { month: "data 1", ax: 10, ay: 11, t: 3 },
    { month: "data 2", ax: 12, ay: 9, t: 3 },
    { month: "data 3", ax: 11, ay: 10, t: 3 },
    { month: "data 4", ax: 15, ay: 12, t: 3 },
    { month: "data 5", ax: 10, ay: 15, t: 3 },
    { month: "data 6", ax: 12, ay: 14, t: 3 },
    { month: "data 7", ax: 13, ay: 10, t: 3 },
];

const ImuChart = () => {
    const [selectedTimeRange, setSelectedTimeRange] = useState("Filtrar por");

    return (
        <motion.div
            className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-100'>a(m/s²) vs g</h2>
                <select
                    className='bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                >
                    <option>Filtrar por</option>
                    <option>Filtro 1</option>
                    <option>Filtro 2</option>
                    <option>Filtro 3</option>
                </select>
            </div>

            <div style={{ width: "100%", height: 400 }}>
                <ResponsiveContainer>
                    <AreaChart data={imuData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#374151' />
                        <XAxis dataKey='month' stroke='#9CA3AF' />
                        <YAxis stroke='#9CA3AF' />
                        <Tooltip
                            contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
                            itemStyle={{ color: "#E5E7EB" }}
                        />
                        <Legend />
                        <Area type='monotone' dataKey='ax' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
                        <Area type='monotone' dataKey='ay' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
                        <Area type='monotone' dataKey='t' stroke='#F59E0B' fill='#F59E0B' fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};
export default ImuChart;