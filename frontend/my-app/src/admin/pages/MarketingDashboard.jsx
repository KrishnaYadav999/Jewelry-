import React, { useState, useEffect } from "react";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement, RadialLinearScale, RadarController } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ArcElement, RadialLinearScale, RadarController);

const MarketingDashboard = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    activeCampaigns: 0,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    channelPerformance: [40, 30, 20, 10],
    campaignPerformance: [1200, 1500, 1800, 2000],
    trafficSources: [40, 30, 20, 10],
    conversionRate: 5,
    cartAbandonmentRate: 30,
  });

  const [darkMode, setDarkMode] = useState(false);

  // Simulating dynamic data for Marketing Analytics
  useEffect(() => {
    const interval = setInterval(() => {
      setData({
        totalRevenue: data.totalRevenue + Math.random() * 1000,
        activeCampaigns: Math.floor(Math.random() * 10),
        impressions: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 500),
        ctr: (data.clicks / data.impressions * 100).toFixed(2),
        channelPerformance: data.channelPerformance.map(() => Math.floor(Math.random() * 100)),
        campaignPerformance: data.campaignPerformance.map(() => Math.floor(Math.random() * 5000)),
        trafficSources: data.trafficSources.map(() => Math.floor(Math.random() * 100)),
        conversionRate: (Math.random() * 5).toFixed(2),
        cartAbandonmentRate: (Math.random() * 40).toFixed(2),
      });
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [data]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  // Channel Breakdown (Doughnut Chart)
  const channelChartData = {
    labels: ["Social Media", "Paid Ads", "Referral", "Direct"],
    datasets: [
      {
        data: data.channelPerformance,
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"],
        hoverOffset: 10,
      },
    ],
  };

  // Campaign Performance (Bar Chart)
  const campaignChartData = {
    labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
    datasets: [
      {
        label: "Revenue ($)",
        data: data.campaignPerformance,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        borderWidth: 1,
      },
    ],
  };

  // Traffic Sources (Bar Chart)
  const trafficChartData = {
    labels: ["Organic", "Paid", "Referral", "Direct"],
    datasets: [
      {
        label: "Traffic Sources",
        data: data.trafficSources,
        backgroundColor: "#22c55e",
        borderColor: "#22c55e",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`p-8 min-h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
      <h1 className="text-3xl font-bold mb-8">Marketing Analytics Dashboard</h1>

      {/* Dark Mode Toggle */}
      <button 
        className="px-4 py-2 rounded-lg bg-blue-500 text-white mb-8" 
        onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Total Revenue</h3>
          <p className="text-3xl font-bold">${data.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Active Campaigns</h3>
          <p className="text-3xl font-bold">{data.activeCampaigns}</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Click-Through Rate</h3>
          <p className="text-3xl font-bold">{data.ctr}%</p>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Conversion Rate</h3>
          <p className="text-3xl font-bold">{data.conversionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Marketing Channel Performance</h4>
          <Doughnut data={channelChartData} />
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Campaign Performance</h4>
          <Bar data={campaignChartData} />
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Traffic Sources</h4>
          <Bar data={trafficChartData} />
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
