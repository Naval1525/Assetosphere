import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UserPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token
        }
      };

      const response = await axios.get('http://localhost:8000/api/purchases', config);
      setPolicies(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch policies');
      setLoading(false);
      toast.error('Failed to fetch policies');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Insurance Policies</h2>
      
      <div className="grid gap-6">
        {policies.map((policy) => (
          <motion.div
            key={policy._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{policy.plan.name}</h3>
                <p className="text-gray-600">Amount: ₹{policy.amount}</p>
                <p className="text-gray-600">Duration: {policy.plan.duration} months</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                  {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  Purchased: {new Date(policy.purchaseDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Expires: {new Date(policy.expiryDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {policies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No policies found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserPolicies; 