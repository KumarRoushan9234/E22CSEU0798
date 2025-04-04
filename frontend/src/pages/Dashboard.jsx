import Chart from "../components/Chart";

const data = [
  { name: "Mon", posts: 40, comments: 24 },
  { name: "Tue", posts: 30, comments: 13 },
  { name: "Wed", posts: 20, comments: 98 },
  { name: "Thu", posts: 27, comments: 39 },
  { name: "Fri", posts: 18, comments: 48 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Analytics Overview</h2>
      <Chart data={data} />
    </div>
  );
}
