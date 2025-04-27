import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const UserClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/claims');
      setClaims(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch claims');
      setLoading(false);
      toast.error('Failed to fetch claims');
    }
  };

  const handleStatusUpdate = async (claimId, status) => {
    try {
      await axios.patch(`http://localhost:8000/api/claims/${claimId}/status`, 
        { status }
      );
      
      // Update the local state
      setClaims(claims.map(claim => 
        claim._id === claimId ? { ...claim, status } : claim
      ));
      
      toast.success('Claim status updated successfully');
    } catch (err) {
      toast.error('Failed to update claim status');
    }
  };

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = 
      claim.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.user.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
    
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Claims</h2>
        
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredClaims.map((claim) => (
          <motion.div
            key={claim._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{claim.user.name}</h3>
                <p className="text-gray-600">{claim.user.email}</p>
                <p className="text-gray-600">{claim.user.phone}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                  claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  claim.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  Claim Date: {formatDate(claim.claimDate)}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Claim Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Plan: {claim.plan.name}</p>
                  <p className="text-gray-600">Claim Amount: ₹{claim.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Device: {claim.deviceDetails}</p>
                  <p className="text-gray-600">Issue: {claim.issueDescription}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Supporting Documents</h4>
              <div className="flex flex-wrap gap-2">
                {claim.documents.map((doc, index) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Document {index + 1}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Actions</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(claim._id, 'processing')}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Start Processing
                </button>
                <button
                  onClick={() => handleStatusUpdate(claim._id, 'approved')}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(claim._id, 'rejected')}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredClaims.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No claims found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserClaimsList; 