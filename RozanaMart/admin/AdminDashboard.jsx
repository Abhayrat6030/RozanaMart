import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    revenue: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dashRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/dashboard'),
        axios.get('http://localhost:5000/api/admin/orders')
      ]);
      
      setStats(dashRes.data.stats);
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const chartData = [
    { name: 'Orders', total: stats.totalOrders, delivered: stats.deliveredOrders },
    { name: 'Revenue', value: stats.revenue / 1000 }, // in thousands
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold">Delivered</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.deliveredOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-semibold">Revenue</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">₹{Math.round(stats.revenue / 1000)}K</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ name: 'Stats', value: stats.totalOrders, pending: stats.pendingOrders, delivered: stats.deliveredOrders }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" />
              <Bar dataKey="pending" fill="#fbbf24" />
              <Bar dataKey="delivered" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ name: 'Revenue', value: stats.revenue }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{order.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{Math.round(order.amounts.total)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
