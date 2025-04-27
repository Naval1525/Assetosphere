import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpiringBills = () => {
  const [expiringBills, setExpiringBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, week, month
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchExpiringBills();
  }, [filter]);

  const fetchExpiringBills = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/purchases/expiring?filter=${filter}`,{
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setExpiringBills(res.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch expiring bills');
      setLoading(false);
    }
  };

  const filteredBills = expiringBills.filter(bill => {
    const matchesSearch = 
      bill.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.deviceDetails.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (days) => {
    if (days <= 7) return 'critical';
    if (days <= 30) return 'warning';
    return 'normal';
  };

  const handleContactCustomer = async (bill) => {
    try {
      // Here you would implement your contact logic
      // For example, sending an email or notification
      toast.success(`Contacted ${bill.customerName} about their expiring plan`);
    } catch (err) {
      toast.error('Failed to contact customer');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Expiring Plans</h2>
          <p className="text-sm text-gray-500">Manage and contact customers with expiring plans</p>
        </div>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Expiring</option>
            <option value="week">Expiring in 7 days</option>
            <option value="month">Expiring in 30 days</option>
          </select>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <h3 className="text-sm font-medium text-gray-500">Total Expiring</h3>
          <p className="text-2xl font-bold text-gray-900">{expiringBills.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <h3 className="text-sm font-medium text-gray-500">Critical (≤7 days)</h3>
          <p className="text-2xl font-bold text-red-600">
            {expiringBills.filter(bill => getDaysUntilExpiry(bill.expiryDate) <= 7).length}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <h3 className="text-sm font-medium text-gray-500">Warning (≤30 days)</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {expiringBills.filter(bill => getDaysUntilExpiry(bill.expiryDate) <= 30).length}
          </p>
        </motion.div>
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill) => {
                const daysUntilExpiry = getDaysUntilExpiry(bill.expiryDate);
                const status = getExpiryStatus(daysUntilExpiry);
                
                return (
                  <motion.tr
                    key={bill._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{bill.customerName}</div>
                          <div className="text-sm text-gray-500">{bill.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bill.plan.name}</div>
                      <div className="text-sm text-gray-500">${bill.plan.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{bill.deviceDetails}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        status === 'critical' ? 'bg-red-100 text-red-800' :
                        status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {daysUntilExpiry} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleContactCustomer(bill)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Contact
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpiringBills; 