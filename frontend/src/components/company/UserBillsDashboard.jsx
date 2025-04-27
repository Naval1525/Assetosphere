import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UserBillsDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExpiry, setFilterExpiry] = useState('all'); // all, expiring, expired

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
      toast.error('Failed to fetch users');
    }
  };

  const getExpiryStatus = (purchaseDate, warrantyPeriodMonths) => {
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + warrantyPeriodMonths);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring';
    return 'active';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.includes(searchTerm);
    
    if (filterExpiry === 'all') return matchesSearch;
    
    return matchesSearch && user.bills.some(bill => 
      getExpiryStatus(bill.purchaseDate, bill.warrantyPeriodMonths) === filterExpiry
    );
  });

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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Bills Dashboard</h2>
        
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
              value={filterExpiry}
              onChange={(e) => setFilterExpiry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Bills</option>
              <option value="expiring">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">{user.phoneNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Total Bills: {user.bills.length}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Bills</h4>
              <div className="grid gap-4">
                {user.bills.map((bill, index) => {
                  const expiryStatus = getExpiryStatus(bill.purchaseDate, bill.warrantyPeriodMonths);
                  const expiryDate = new Date(bill.purchaseDate);
                  expiryDate.setMonth(expiryDate.getMonth() + bill.warrantyPeriodMonths);
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        expiryStatus === 'expired' ? 'bg-red-50' :
                        expiryStatus === 'expiring' ? 'bg-yellow-50' :
                        'bg-green-50'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <p className="font-medium text-gray-800">{bill.productName}</p>
                          <p className="text-sm text-gray-600">Store: {bill.storeName}</p>
                          <p className="text-sm text-gray-600">Amount: ₹{bill.totalAmount}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            expiryStatus === 'expired' ? 'bg-red-100 text-red-800' :
                            expiryStatus === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {expiryStatus === 'expired' ? 'Expired' :
                             expiryStatus === 'expiring' ? 'Expiring Soon' :
                             'Active'}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            Expires: {formatDate(expiryDate)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <a
                          href={bill.invoiceFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Invoice
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserBillsDashboard; 