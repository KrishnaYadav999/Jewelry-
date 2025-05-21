import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const HomeContent = () => {
  const [userCount, setUserCount] = useState(277);
  const [sales, setSales] = useState(3787681.0);
  const [profit, setProfit] = useState(1298745.0);
  const [visitors, setVisitors] = useState(10234);
  const [activityLog, setActivityLog] = useState([]);
  const [timeFrame] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 10));
      setSales((prev) => prev + Math.random() * 1000);
      setProfit((prev) => prev + Math.random() * 500);
      setVisitors((prev) => prev + Math.floor(Math.random() * 5));

      setActivityLog((prev) => [
        ...prev,
        `New update: Users ${Math.floor(Math.random() * 10)} | Sales $${Math.floor(Math.random() * 1000)}`,
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Pie chart data
  const pieData = {
    labels: ["2013", "2014", "2015", "2016"],
    datasets: [
      {
        data: [26.7, 30.3, 17.1, 25.9],
        backgroundColor: ["#22c55e", "#ef4444", "#facc15", "#3b82f6"],
        hoverBackgroundColor: ["#16a34a", "#dc2626", "#eab308", "#2563eb"],
      },
    ],
  };

  // Line chart data
  const lineData = {
    labels: timeFrame,
    datasets: [
      {
        label: "Sales",
        data: timeFrame.map(() => Math.floor(Math.random() * 10000)),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Profit",
        data: timeFrame.map(() => Math.floor(Math.random() * 5000)),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Card data
  const metrics = [
    { title: "Total Users", value: userCount, icon: "👤", color: "bg-green-500" },
    { title: "Total Sales", value: `$${sales.toLocaleString()}`, icon: "💰", color: "bg-blue-500" },
    { title: "Profit", value: `$${profit.toLocaleString()}`, icon: "📈", color: "bg-yellow-500" },
    { title: "Visitors", value: visitors, icon: "🌍", color: "bg-pink-500" },
  ];

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Search and Notifications */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="ml-4 p-3 bg-yellow-100 text-yellow-600 rounded-lg">
          <strong>Alert:</strong> Sales target is approaching!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Metric Cards */}
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`${metric.color} text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{metric.title}</h3>
              <div className="text-3xl">{metric.icon}</div>
            </div>
            <p className="text-4xl font-bold mt-4">{metric.value}</p>
            <p className="mt-2 text-sm">Updated in real-time</p>
          </div>
        ))}

        {/* Pie Chart */}
        <div className="col-span-1 md:col-span-3 lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-gray-800">Sales Distribution</h3>
          <p className="text-sm text-gray-500">Annual sales by year</p>
          <div className="mt-6">
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">Performance Trends</h3>
        <p className="text-sm text-gray-500">Sales and Profit Over Time</p>
        <div className="mt-6">
          <Line data={lineData} />
        </div>
      </div>

      {/* Activity Logs */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-gray-800">Activity Logs</h3>
        <ul className="mt-4 space-y-2">
          {activityLog.slice(-5).map((log, index) => (
            <li key={index} className="text-sm text-gray-600">
              {log}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm text-center">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomeContent;
