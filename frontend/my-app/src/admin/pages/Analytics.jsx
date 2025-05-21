import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
} from "recharts";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    avgRatings: {
      mangalsutras: 0,
      bangles: 0,
      bracelets: 0,
      earrings: 0,
      pendantSets: 0,
      rings: 0,
    },
    productCount: {},
    discounts: {},
    salesByCategory: [],
    conversionRate: 0,
    totalRevenueByProduct: [],
    revenueDiscountComparison: [],
    conversionRateTrend: [],
    salesByDate: [],
    userGrowthTrend: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const endpoints = {
        mangalsutras: "http://localhost:5000/api/mangalsutras",
        bangles: "http://localhost:5000/api/bangles",
        bracelets: "http://localhost:5000/api/bracelets",
        earrings: "http://localhost:5000/api/earrings",
        pendantSets: "http://localhost:5000/api/pendantSets",
        rings: "http://localhost:5000/api/rings",
        orders: "http://localhost:5000/api/orders",
        users: "http://localhost:5000/api/users",
      };

      const results = await Promise.all(
        Object.entries(endpoints).map(async ([key, url]) => {
          try {
            const response = await axios.get(url);
            return { [key]: response.data };
          } catch (err) {
            console.error(`Error fetching ${key}:`, err.message);
            return { [key]: [] };
          }
        })
      );

      const aggregatedData = results.reduce((acc, result) => {
        return { ...acc, ...result };
      }, {});

      calculateAnalytics(aggregatedData);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (data) => {
    const orders = Array.isArray(data.orders?.orders) ? data.orders.orders : [];
    const users = Array.isArray(data.users) ? data.users : [];
    const categories = ["mangalsutras", "bangles", "bracelets", "earrings", "pendantSets", "rings"];

    const totalSales = orders.reduce(
      (sum, order) => sum + (order.price || 0) * (order.quantity || 0),
      0
    );
    const totalOrders = orders.length;
    const totalUsers = users.length;

    const salesByCategory = categories.map((category) => {
      const products = Array.isArray(data[category]?.[category]) ? data[category][category] : [];
      const categorySales = products.reduce(
        (sum, product) => sum + (product.price * product.discount) / 100,
        0
      );
      return { name: category, sales: categorySales };
    });

    const conversionRateTrend = [
      { name: "Week 1", rate: 0.1 },
      { name: "Week 2", rate: 0.15 },
      { name: "Week 3", rate: 0.2 },
      { name: "Week 4", rate: 0.25 },
    ];

    const totalRevenueByProduct = categories.map((category) => {
      const products = Array.isArray(data[category]?.[category]) ? data[category][category] : [];
      const totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
      return { name: category, revenue: totalRevenue };
    });

    const revenueDiscountComparison = categories.map((category) => {
      const products = Array.isArray(data[category]?.[category]) ? data[category][category] : [];
      const revenue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
      const discountValue = products.reduce((sum, product) => sum + (product.price * product.discount) / 100, 0);
      return {
        name: category,
        revenue: revenue,
        discount: discountValue,
      };
    });

    const avgRatings = categories.reduce((acc, category) => {
      const products = Array.isArray(data[category]?.[category]) ? data[category][category] : [];
      const avgRating = products.reduce((sum, product) => sum + (product.rating || 0), 0) / products.length;
      acc[category] = avgRating || 0;
      return acc;
    }, {});

    const salesByDate = [
      { date: "2023-11-01", sales: 5000 },
      { date: "2023-11-02", sales: 7000 },
      { date: "2023-11-03", sales: 9000 },
      { date: "2023-11-04", sales: 6000 },
    ];

    const userGrowthTrend = [
      { name: "Week 1", users: 50 },
      { name: "Week 2", users: 80 },
      { name: "Week 3", users: 120 },
      { name: "Week 4", users: 150 },
    ];

    setAnalytics({
      totalSales,
      totalOrders,
      totalUsers,
      salesByCategory,
      conversionRateTrend,
      totalRevenueByProduct,
      revenueDiscountComparison,
      avgRatings,
      salesByDate,
      userGrowthTrend,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Real-Time Analytics</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <>
          <h2>Total Sales: ₹{analytics.totalSales.toFixed(2)}</h2>
          <h2>Total Orders: {analytics.totalOrders}</h2>
          <h2>Total Users: {analytics.totalUsers}</h2>

          {/* Avg Ratings for all Categories */}
          <h3>Average Ratings:</h3>
          <ul>
            <li>Bangles: {analytics.avgRatings.bangles.toFixed(2)}</li>
            <li>Bracelets: {analytics.avgRatings.bracelets.toFixed(2)}</li>
            <li>Earrings: {analytics.avgRatings.earrings.toFixed(2)}</li>
            <li>Pendant Sets: {analytics.avgRatings.pendantSets.toFixed(2)}</li>
            <li>Rings: {analytics.avgRatings.rings.toFixed(2)}</li>
          </ul>

          {/* Table view for Analytics */}
          <table style={{ width: "100%", margin: "20px 0", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Metric</th>
                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Total Sales</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>₹{analytics.totalSales.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Total Orders</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{analytics.totalOrders}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>Total Users</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{analytics.totalUsers}</td>
              </tr>
            </tbody>
          </table>

          {/* Line Chart: Conversion Rate Trend */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.conversionRateTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rate" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          {/* Bar Chart: Sales by Category */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.salesByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          {/* Area Chart: Revenue by Product */}
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analytics.totalRevenueByProduct}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>

          {/* Scatter Chart: Revenue vs Discount */}
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="revenue" name="Revenue" unit="₹" />
              <YAxis type="number" dataKey="discount" name="Discount" unit="₹" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Revenue vs Discount" data={analytics.revenueDiscountComparison} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>

          {/* Line Chart: Sales by Date */}
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.salesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

        </>
      )}
    </div>
  );
};

export default Analytics;
