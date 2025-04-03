import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function EnergyChart({ data }) {

  const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));


  const chartData = sorted.map((entry) => ({
    name: new Date(entry.date).toLocaleDateString("en-UK", { month: "short", year: "2-digit" }),
    usage: entry.usage,
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="usage" stroke="#16a34a" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
