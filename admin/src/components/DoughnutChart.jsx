import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Income", value: 150020 },
  { name: "Expense", value: 50010 },
];

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

const DoughnutChart = () => {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <PieChart width={500} height={400}>
        <Tooltip />
        <Legend />
        <Pie
          data={data}
          innerRadius={110}
          outerRadius={180}
          fill="#8884d8"
          paddingAngle={5}
          dataKey={"value"}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;