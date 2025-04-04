import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ data }) {
  return (
    <div className="bg-white p-4 shadow rounded-md">
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="posts" stroke="#8884d8" />
        <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
