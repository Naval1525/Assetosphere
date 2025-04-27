import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UserBillsList = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/purchases', {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      setPurchases(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch purchases');
      setLoading(false);
      toast.error('Failed to fetch purchases');
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = 
      purchase.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.customerPhone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || purchase.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Purchases</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPurchases.map((purchase) => (
          <motion.div
            key={purchase._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{purchase.customerName}</h3>
                <p className="text-gray-600">{purchase.customerEmail}</p>
                <p className="text-gray-600">{purchase.customerPhone}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  purchase.status === 'active' ? 'bg-green-100 text-green-800' :
                  purchase.status === 'expired' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  Expires: {formatDate(purchase.expiryDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Plan Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Plan: {purchase.plan.name}</p>
                  <p className="text-gray-600">Price: ₹{purchase.plan.price}</p>
                </div>
                <div>
                  <p className="text-gray-600">Device: {purchase.deviceDetails}</p>
                  <p className="text-gray-600">Payment: {purchase.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Customer Address</h4>
              <p className="text-gray-600">{purchase.customerAddress}</p>
            </div>
          </motion.div>
        ))}

        {filteredPurchases.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No purchases found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserBillsList; 