import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiHome, FiUsers, FiPackage, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPlans: 0,
    activePlans: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/companies/stats', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/company/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">Assetosphere</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            <Link to="/company/dashboard" className="flex items-center px-4 py-3 text-gray-700 bg-blue-50 rounded-lg">
              <FiHome className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/company/plans" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <FiPackage className="w-5 h-5 mr-3" />
              Plans
            </Link>
            <Link to="/company/users" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <FiUsers className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link to="/company/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg">
              <FiSettings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FiLogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}</h1>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-500">Total Plans</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.totalPlans}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-500">Active Plans</h3>
            <p className="text-3xl font-bold text-green-600">{stats.activePlans}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-500">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-medium text-gray-500">Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">${stats.revenue}</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add recent activity items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard; 